import { add, sub, mul, div, round, fix, calc, calcExpr } from '@/utils/calc.js'

describe('Utils:calc', () => {
  describe('add', () => {
    it('precision: 0.1 + 0.2 = 0.3', () => {
      expect(add(0.1, 0.2)).toBe(0.3)
    })
    it('multiple args', () => {
      expect(add(0.1, 0.2, 0.3)).toBe(0.6)
    })
    it('no args', () => {
      expect(add()).toBe(0)
    })
    it('string args', () => {
      expect(add('0.1', '0.2')).toBe(0.3)
    })
    it('invalid args fallback to 0', () => {
      expect(add(null, undefined, '', 'abc')).toBe(0)
      expect(add(1, 'abc')).toBe(1)
    })
  })

  describe('sub', () => {
    it('precision: 0.3 - 0.1 = 0.2', () => {
      expect(sub(0.3, 0.1)).toBe(0.2)
    })
    it('multiple args', () => {
      expect(sub(10, 3, 2)).toBe(5)
    })
    it('single arg', () => {
      expect(sub(7)).toBe(7)
    })
  })

  describe('mul', () => {
    it('precision: 19.9 * 100 = 1990', () => {
      expect(mul(19.9, 100)).toBe(1990)
    })
    it('multiple args', () => {
      expect(mul(2, 3, 4)).toBe(24)
    })
    it('no args', () => {
      expect(mul()).toBe(1)
    })
  })

  describe('div', () => {
    it('precision: 1.21 / 1.1 = 1.1', () => {
      expect(div(1.21, 1.1)).toBe(1.1)
    })
    it('multiple args', () => {
      expect(div(100, 5, 2)).toBe(10)
    })
    it('divide by zero returns 0', () => {
      expect(div(10, 0)).toBe(0)
      expect(div(10, 0, 2)).toBe(0)
    })
  })

  describe('round', () => {
    it('round(1.005, 2) = 1.01 (原生 toFixed 的坑)', () => {
      expect(round(1.005, 2)).toBe(1.01)
    })
    it('default 2 digits', () => {
      expect(round(1.236)).toBe(1.24)
    })
    it('returns number', () => {
      expect(typeof round(1.005, 2)).toBe('number')
    })
  })

  describe('fix', () => {
    it('default 2 digits string', () => {
      expect(fix(1990)).toBe('1990.00')
    })
    it('custom digits', () => {
      expect(fix(1.005, 2)).toBe('1.01')
    })
    it('returns string', () => {
      expect(typeof fix(1)).toBe('string')
    })
  })

  describe('calc chain', () => {
    it('basic chain', () => {
      expect(calc(19.9).mul(100).add(5).round(2).value()).toBe(1995)
    })
    it('default init is 0', () => {
      expect(calc().add(1, 2).value()).toBe(3)
    })
    it('chain methods accept multiple args', () => {
      expect(calc(100).add(1, 2, 3).value()).toBe(106)
    })
    it('fixed() returns display string', () => {
      expect(calc(19.9).mul(100).fixed(2)).toBe('1990.00')
    })
    it('chain with div by zero', () => {
      expect(calc(10).div(0).value()).toBe(0)
    })
    it('chain result consistent with function style', () => {
      const chained = calc(0.1).add(0.2).mul(10).value()
      const functional = mul(add(0.1, 0.2), 10)
      expect(chained).toBe(functional)
      expect(chained).toBe(3)
    })
    it('invalid init fallback to 0', () => {
      expect(calc('abc').add(1).value()).toBe(1)
    })
  })

  describe('calcExpr', () => {
    it('basic precision', () => {
      expect(calcExpr('0.1 + 0.2')).toBe(0.3)
      expect(calcExpr('19.9 * 100')).toBe(1990)
      expect(calcExpr('1.21 / 1.1')).toBe(1.1)
    })
    it('precedence: * before +', () => {
      expect(calcExpr('1 + 2 * 3')).toBe(7)
      expect(calcExpr('2 * 3 + 1')).toBe(7)
      expect(calcExpr('10 - 4 / 2')).toBe(8)
    })
    it('parentheses', () => {
      expect(calcExpr('(1 + 2) * 3')).toBe(9)
      expect(calcExpr('((1 + 2) * (3 + 4))')).toBe(21)
    })
    it('unary minus', () => {
      expect(calcExpr('-1 + 2')).toBe(1)
      expect(calcExpr('2 * -3')).toBe(-6)
      expect(calcExpr('-(1 + 2)')).toBe(-3)
      expect(calcExpr('10 - -5')).toBe(15)
    })
    it('variables in scope', () => {
      expect(calcExpr('price * count + fee', { price: 19.9, count: 100, fee: 5 })).toBe(1995)
      expect(calcExpr('price * count + fee - discount', { price: 19.9, count: 100, fee: 5, discount: 20 })).toBe(1975)
    })
    it('variable values go through toNum fallback', () => {
      expect(calcExpr('a + b', { a: '0.1', b: null })).toBe(0.1)
    })
    it('scientific notation', () => {
      expect(calcExpr('1e2 + 1')).toBe(101)
    })
    it('divide by zero returns 0', () => {
      expect(calcExpr('10 / 0')).toBe(0)
    })
    it('consistent with function style', () => {
      expect(calcExpr('0.1 + 0.2 * 10')).toBe(add(0.1, mul(0.2, 10)))
    })
    it('throws on unmatched parentheses', () => {
      expect(() => calcExpr('(1 + 2')).toThrow('括号不匹配')
      expect(() => calcExpr('1 + 2)')).toThrow()
    })
    it('throws on undefined variable', () => {
      expect(() => calcExpr('a + 1')).toThrow('未在 scope 中提供')
    })
    it('throws on invalid token', () => {
      expect(() => calcExpr('1 + +')).toThrow()
      expect(() => calcExpr('a..b + 1')).toThrow()
    })
    it('throws on empty or non-string expr', () => {
      expect(() => calcExpr('')).toThrow()
      expect(() => calcExpr(null)).toThrow()
    })
  })
})
