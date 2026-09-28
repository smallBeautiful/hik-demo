/**
 * 浮点精度安全的算术工具
 * 底层基于 number-precision，解决 0.1 + 0.2 !== 0.3 这类问题
 *
 * 函数式（支持多参数）：
 *   add(0.1, 0.2, 0.3)        // 0.6
 *   mul(19.9, 100)            // 1990
 *
 * 链式：
 *   calc(19.9).mul(100).add(5).round(2).value()  // 1995
 *
 * 表达式（按原生算术写法）：
 *   calcExpr('price * count + fee', { price: 19.9, count: 100, fee: 5 })  // 1995
 */
import NP from 'number-precision'

// 统一转数字，null/undefined/''/非法值兜底为 0，避免 NaN 传染
function toNum(val) {
  const n = Number(val)
  return Number.isFinite(n) ? n : 0
}

export function add(...args) {
  return args.reduce((acc, cur) => NP.plus(acc, toNum(cur)), 0)
}

export function sub(...args) {
  return args.reduce((acc, cur, i) => (i === 0 ? toNum(cur) : NP.minus(acc, toNum(cur))))
}

export function mul(...args) {
  return args.reduce((acc, cur) => NP.times(acc, toNum(cur)), 1)
}

export function div(...args) {
  return args.reduce((acc, cur, i) => {
    const d = toNum(cur)
    if (i > 0 && d === 0) return 0 // 除零兜底，返回 0 不产生 Infinity
    return i === 0 ? d : NP.divide(acc, d)
  })
}

// 四舍五入保留 d 位小数，返回数字，用于继续参与计算
export function round(val, d = 2) {
  return NP.round(toNum(val), d)
}

// 保留 d 位小数，返回字符串，用于页面展示
// 先 NP.round 修正精度再格式化，避开原生 toFixed 的进位坑（如 (1.005).toFixed(2) === '1.00'）
export function fix(val, d = 2) {
  return NP.round(toNum(val), d).toFixed(d)
}

/**
 * 链式调用入口
 * @param {number|string} init 初始值，缺省 0
 * @returns 链式对象，value() 取结果
 */
export function calc(init = 0) {
  let val = toNum(init)
  const api = {
    add: (...args) => { val = add(val, ...args); return api },
    sub: (...args) => { val = sub(val, ...args); return api },
    mul: (...args) => { val = mul(val, ...args); return api },
    div: (...args) => { val = div(val, ...args); return api },
    round: (d = 2) => { val = round(val, d); return api },
    // 取最终结果（数字）
    value: () => val,
    // 取最终结果（保留 d 位小数的字符串，直接用于展示）
    fixed: (d = 2) => fix(val, d)
  }
  return api
}

/* ==================== 表达式计算 ==================== */

// 运算符优先级
const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2 }

// 词法切分：数字（含小数/科学计数法）、标识符、运算符、括号
const TOKEN_RE = /\s*(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[A-Za-z_$][\w$]*|[+\-*/()])/y

function tokenize(expr) {
  const tokens = []
  let pos = 0
  const src = expr.trim()
  while (pos < src.length) {
    TOKEN_RE.lastIndex = pos
    const m = TOKEN_RE.exec(src)
    if (!m) {
      throw new Error(`[calc] 表达式解析失败: "${expr}" 位置 ${pos}`)
    }
    tokens.push(m[1])
    pos = TOKEN_RE.lastIndex
  }
  return tokens
}

// 调度场算法：中缀 -> 后缀（逆波兰），处理优先级、括号、一元负号
function toRPN(tokens) {
  const output = []
  const ops = []
  let prev = null
  for (const t of tokens) {
    if (t === '(') {
      ops.push(t)
    } else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') output.push(ops.pop())
      if (!ops.length) throw new Error('[calc] 括号不匹配')
      ops.pop() // 弹出 '('
    } else if (t in PRECEDENCE) {
      // '-' 出现在开头 / 左括号后 / 运算符后，视为一元负号
      const unary = t === '-' && (prev === null || prev === '(' || (prev in PRECEDENCE) || prev === 'u-')
      const op = unary ? 'u-' : t
      const prec = op === 'u-' ? 3 : PRECEDENCE[t]
      while (ops.length && ops[ops.length - 1] !== '(') {
        const top = ops[ops.length - 1]
        const tp = top === 'u-' ? 3 : PRECEDENCE[top]
        // 一元负号右结合，其余左结合
        if (tp > prec || (tp === prec && op !== 'u-')) output.push(ops.pop())
        else break
      }
      ops.push(op)
    } else {
      output.push(t) // 数字或变量名
    }
    prev = t
  }
  while (ops.length) {
    const op = ops.pop()
    if (op === '(') throw new Error('[calc] 括号不匹配')
    output.push(op)
  }
  return output
}

// 求值后缀表达式，二元运算全部走 number-precision
function evalRPN(rpn, scope) {
  const stack = []
  for (const t of rpn) {
    if (t === 'u-') {
      stack.push(-stack.pop()) // 取负不产生精度误差，原生即可
    } else if (t in PRECEDENCE) {
      const b = stack.pop()
      const a = stack.pop()
      if (a === undefined || b === undefined) throw new Error('[calc] 表达式不完整')
      if (t === '+') stack.push(NP.plus(a, b))
      else if (t === '-') stack.push(NP.minus(a, b))
      else if (t === '*') stack.push(NP.times(a, b))
      else stack.push(b === 0 ? 0 : NP.divide(a, b)) // 除零与 div() 行为一致
    } else if (/^[A-Za-z_$]/.test(t)) {
      if (!(t in scope)) throw new Error(`[calc] 表达式中的变量 "${t}" 未在 scope 中提供`)
      stack.push(toNum(scope[t]))
    } else {
      stack.push(toNum(t))
    }
  }
  if (stack.length !== 1) throw new Error('[calc] 表达式不完整')
  return stack[0]
}

/**
 * 表达式计算：按原生算术写法传入字符串，内部走精度安全运算
 * 支持 + - * / 、括号、一元负号、数字与变量
 * @param {string} expr 表达式，如 'price * count + fee'
 * @param {Object} scope 变量表，如 { price: 19.9, count: 100 }
 * @returns {number}
 *
 * calcExpr('price * count + fee - discount', { price: 19.9, count: 100, fee: 5, discount: 20 })
 */
export function calcExpr(expr, scope = {}) {
  if (typeof expr !== 'string' || !expr.trim()) throw new Error('[calc] 表达式必须是非空字符串')
  return evalRPN(toRPN(tokenize(expr)), scope)
}

export default { add, sub, mul, div, round, fix, calc, calcExpr }
