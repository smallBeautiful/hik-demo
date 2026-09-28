<template>
  <div class="app-container">
    <el-alert
      title="calc 工具函数使用示例：浮点精度安全的加减乘除"
      type="info"
      :closable="false"
      description="业务代码中 0.1 + 0.2 !== 0.3、19.9 * 100 !== 1990 这类浮点问题会导致金额/统计误差，统一使用 @/utils/calc 计算。"
      style="margin-bottom: 20px"
    />

    <el-tabs v-model="activeTab">
      <!-- 常用计算场景 -->
      <el-tab-pane label="常用计算" name="scene">
        <el-table :data="sceneList" border>
          <el-table-column label="场景" prop="name" width="220" />
          <el-table-column label="写法" prop="code" min-width="280">
            <template slot-scope="{ row }">
              <code>{{ row.code }}</code>
            </template>
          </el-table-column>
          <el-table-column label="结果" width="180">
            <template slot-scope="{ row }">
              <el-tag type="success">{{ row.result }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="原生写法结果（对照组）" width="180">
            <template slot-scope="{ row }">
              <el-tag :type="row.error ? 'danger' : 'info'">{{ row.nativeResult }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- API 速查 -->
      <el-tab-pane label="API 速查" name="api">
        <el-table :data="apiList" border>
          <el-table-column label="函数" prop="fn" width="140">
            <template slot-scope="{ row }">
              <code>{{ row.fn }}</code>
            </template>
          </el-table-column>
          <el-table-column label="说明" prop="desc" min-width="200" />
          <el-table-column label="示例" min-width="260">
            <template slot-scope="{ row }">
              <code>{{ row.example }}</code>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { add, sub, mul, div, round, fix, calc, calcExpr } from '@/utils/calc'

export default {
  name: 'CalcDemo',
  data() {
    return {
      activeTab: 'scene',
      sceneList: [
        {
          name: '金额求和（多参数）',
          code: 'add(0.1, 0.2, 0.3)',
          result: add(0.1, 0.2, 0.3),
          nativeResult: 0.1 + 0.2 + 0.3,
          error: true
        },
        {
          name: '单价 × 数量',
          code: 'mul(19.9, 100)',
          result: mul(19.9, 100),
          nativeResult: 19.9 * 100,
          error: true
        },
        {
          name: '总价 - 优惠',
          code: 'sub(100, 33.3, 66.6)',
          result: sub(100, 33.3, 66.6),
          nativeResult: 100 - 33.3 - 66.6,
          error: true
        },
        {
          name: '求占比 / 均价',
          code: 'div(1.21, 1.1)',
          result: div(1.21, 1.1),
          nativeResult: 1.21 / 1.1,
          error: true
        },
        {
          name: '折扣价（乘 + 减）',
          code: 'sub(mul(199, 0.85), 10)',
          result: sub(mul(199, 0.85), 10),
          nativeResult: 199 * 0.85 - 10,
          error: false
        },
        {
          name: '百分比（÷ 后 × 100）',
          code: 'mul(div(37, 40), 100)',
          result: round(mul(div(37, 40), 100), 2),
          nativeResult: (37 / 40) * 100,
          error: false
        },
        {
          name: '平均值',
          code: 'div(add(10.1, 20.2, 30.3), 3)',
          result: round(div(add(10.1, 20.2, 30.3), 3), 4),
          nativeResult: (10.1 + 20.2 + 30.3) / 3,
          error: false
        },
        {
          name: '四舍五入（toFixed 的坑）',
          code: 'round(1.005, 2)',
          result: round(1.005, 2),
          nativeResult: (1.005).toFixed(2) + '（原生 toFixed）',
          error: true
        },
        {
          name: '展示格式化（返回字符串）',
          code: 'fix(1990)',
          result: fix(1990),
          nativeResult: '1990.00',
          error: false
        },
        {
          name: '接口返回字符串直接参与计算',
          code: "add('0.1', '0.2')",
          result: add('0.1', '0.2'),
          nativeResult: "'0.1' + '0.2'（原生会拼成字符串）",
          error: true
        },
        {
          name: '链式：单价×数量+运费-优惠',
          code: 'calc(19.9).mul(100).add(15, 5).sub(20).value()',
          result: calc(19.9).mul(100).add(15, 5).sub(20).value(),
          nativeResult: 19.9 * 100 + 15 + 5 - 20,
          error: true
        },
        {
          name: '表达式：按原生算术写法计算',
          code: "calcExpr('price * count + fee', { price: 19.9, count: 100, fee: 5 })",
          result: calcExpr('price * count + fee', { price: 19.9, count: 100, fee: 5 }),
          nativeResult: 19.9 * 100 + 5,
          error: true
        },
        {
          name: '表达式：括号 / 一元负号都支持',
          code: "calcExpr('-(total + fee) / 3', { total: 0.1, fee: 0.2 })",
          result: calcExpr('-(total + fee) / 3', { total: 0.1, fee: 0.2 }),
          nativeResult: -(0.1 + 0.2) / 3,
          error: true
        },
        {
          name: '链式：算完直接格式化展示',
          code: 'calc(0.1).add(0.2).mul(1000).fixed(2)',
          result: calc(0.1).add(0.2).mul(1000).fixed(2),
          nativeResult: (0.1 + 0.2) * 1000,
          error: true
        }
      ],
      apiList: [
        { fn: 'add', desc: '加法，支持多参数，非法入参兜底为 0', example: 'add(0.1, 0.2, 0.3) → 0.6' },
        { fn: 'sub', desc: '减法，支持多参数，从左到右依次相减', example: 'sub(10, 3, 2) → 5' },
        { fn: 'mul', desc: '乘法，支持多参数', example: 'mul(19.9, 100) → 1990' },
        { fn: 'div', desc: '除法，除数为 0 时返回 0', example: 'div(1.21, 1.1) → 1.1' },
        { fn: 'round', desc: '四舍五入保留 n 位小数，返回数字，用于继续计算', example: 'round(1.005, 2) → 1.01' },
        { fn: 'fix', desc: '保留 n 位小数，返回字符串，用于页面展示', example: 'fix(1990) → "1990.00"' },
        { fn: 'calc', desc: '链式调用入口，value() 取数字，fixed() 取展示字符串', example: 'calc(19.9).mul(100).value() → 1990' },
        { fn: 'calcExpr', desc: '表达式计算，按原生算术写法传字符串，支持 + - * / 括号和一元负号，变量从 scope 取', example: "calcExpr('a * b + c', { a: 19.9, b: 100, c: 5 }) → 1995" }
      ]
    }
  }
}
</script>

<style scoped>
code {
  color: #476582;
  background: #f3f5f7;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
}
</style>
