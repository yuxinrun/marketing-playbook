import type { EChartsCoreOption } from "echarts/core";

export const CHART_PALETTE = ["#EE6514", "#123B57", "#1E4D42", "#D9500B", "#6D3BA8", "#1D5679", "#B23C0D", "#8E3012"];

const baseText = { color: "#4E565B", fontFamily: "var(--font-sans), sans-serif", fontSize: 12 };
const baseTooltip = {
  backgroundColor: "#191C1E",
  borderWidth: 0,
  textStyle: { color: "#F7F4ED", fontSize: 12 },
  padding: [10, 14],
};
const baseLegend = { textStyle: baseText, icon: "roundRect", itemWidth: 12, itemHeight: 8 };

export interface ChartDefinition {
  id: string;
  title: string;
  desc: string;
  unit: string;
  option: EChartsCoreOption;
}

export const chartDefinitions: ChartDefinition[] = [
  {
    id: "funnel", title: "营销漏斗", unit: "人数",
    desc: "从曝光到购买的阶段转化，用来定位流失最大的环节。",
    option: {
      color: CHART_PALETTE,
      tooltip: { ...baseTooltip, trigger: "item", formatter: "{b}<br/>{c} 人" },
      legend: { ...baseLegend, bottom: 0, data: ["曝光", "点击", "访问", "注册", "购买"] },
      series: [{
        type: "funnel", left: "8%", top: 20, bottom: 44, width: "84%",
        min: 0, max: 100000, minSize: "18%", maxSize: "100%", sort: "descending",
        gap: 3, label: { show: true, position: "inside", color: "#fff", fontWeight: 600, formatter: "{b} {c}" },
        itemStyle: { borderColor: "#fff", borderWidth: 2 },
        data: [
          { value: 100000, name: "曝光" }, { value: 12000, name: "点击" },
          { value: 9600, name: "访问" }, { value: 1920, name: "注册" }, { value: 288, name: "购买" },
        ],
      }],
    },
  },
  {
    id: "budget-donut", title: "渠道预算分配", unit: "%",
    desc: "按渠道拆分营销预算，观察资源是否集中在高回报环节。",
    option: {
      color: CHART_PALETTE,
      tooltip: { ...baseTooltip, trigger: "item", formatter: "{b}: {c}%{d}%" },
      legend: { ...baseLegend, orient: "vertical", right: 8, top: "center" },
      series: [{
        type: "pie", radius: ["46%", "70%"], center: ["35%", "50%"],
        avoidLabelOverlap: true, itemStyle: { borderColor: "#fff", borderWidth: 3 },
        label: { show: false }, emphasis: { label: { show: true, fontSize: 14, fontWeight: "bold" } },
        data: [
          { value: 35, name: "内容营销" }, { value: 25, name: "搜索广告" },
          { value: 18, name: "社交媒体" }, { value: 12, name: "达人合作" }, { value: 10, name: "邮件与私域" },
        ],
      }],
    },
  },
  {
    id: "investment-bar", title: "营销投入与收入", unit: "万元",
    desc: "对比月度投入与收入，配合毛利率判断真实回报。",
    option: {
      color: ["#123B57", "#EE6514"],
      tooltip: { ...baseTooltip, trigger: "axis", axisPointer: { type: "shadow" } },
      legend: { ...baseLegend, top: 0 },
      grid: { left: 48, right: 16, top: 40, bottom: 30 },
      xAxis: { type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月"], axisLabel: baseText },
      yAxis: { type: "value", name: "万元", nameTextStyle: baseText, axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [
        { name: "营销投入", type: "bar", data: [12, 15, 14, 18, 20, 22], barMaxWidth: 22 },
        { name: "销售收入", type: "bar", data: [48, 55, 61, 78, 86, 102], barMaxWidth: 22 },
      ],
    },
  },
  {
    id: "growth-line", title: "用户增长趋势", unit: "人",
    desc: "观察新增用户与活跃用户的长期变化，识别增长拐点。",
    option: {
      color: ["#EE6514", "#1E4D42"],
      tooltip: { ...baseTooltip, trigger: "axis" },
      legend: { ...baseLegend, top: 0 },
      grid: { left: 52, right: 16, top: 40, bottom: 30 },
      xAxis: { type: "category", boundaryGap: false, data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"], axisLabel: baseText },
      yAxis: { type: "value", axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [
        { name: "新增用户", type: "line", smooth: true, symbolSize: 7, data: [320, 410, 480, 620, 710, 890, 1020, 1180], areaStyle: { opacity: 0.12 } },
        { name: "活跃用户", type: "line", smooth: true, symbolSize: 7, data: [980, 1120, 1290, 1480, 1710, 1980, 2240, 2560] },
      ],
    },
  },
  {
    id: "cac-ltv", title: "CAC 与 LTV 对比", unit: "元",
    desc: "按渠道比较获客成本与生命周期价值，判断增长健康度。",
    option: {
      color: ["#D9500B", "#1E4D42"],
      tooltip: { ...baseTooltip, trigger: "axis" },
      legend: { ...baseLegend, top: 0 },
      grid: { left: 52, right: 16, top: 40, bottom: 30 },
      xAxis: { type: "category", data: ["搜索广告", "信息流", "内容营销", "达人合作", "私域推荐"], axisLabel: { ...baseText, interval: 0, fontSize: 10 } },
      yAxis: { type: "value", name: "元", nameTextStyle: baseText, axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [
        { name: "CAC 获客成本", type: "bar", data: [280, 210, 95, 160, 45], barMaxWidth: 26 },
        { name: "LTV 生命周期价值", type: "bar", data: [840, 630, 720, 890, 960], barMaxWidth: 26 },
      ],
    },
  },
  {
    id: "channel-effect", title: "内容渠道效果", unit: "次",
    desc: "对比不同内容渠道带来的转化次数，指导资源分配。",
    option: {
      color: ["#6D3BA8"],
      tooltip: { ...baseTooltip, trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: 90, right: 24, top: 20, bottom: 30 },
      xAxis: { type: "value", axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      yAxis: { type: "category", data: ["邮件营销", "公众号", "短视频", "知乎", "搜索引擎"], axisLabel: baseText },
      series: [{ name: "转化次数", type: "bar", data: [180, 260, 340, 420, 680], barMaxWidth: 20, itemStyle: { borderRadius: [0, 4, 4, 0] } }],
    },
  },
  {
    id: "ltv-curve", title: "用户生命周期价值", unit: "元",
    desc: "累积价值随时间增长，可用于评估留存投入的回报。",
    option: {
      color: ["#1E4D42"],
      tooltip: { ...baseTooltip, trigger: "axis" },
      grid: { left: 52, right: 20, top: 30, bottom: 30 },
      xAxis: { type: "category", boundaryGap: false, data: ["0月", "1月", "3月", "6月", "12月", "18月", "24月"], axisLabel: baseText },
      yAxis: { type: "value", axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [{
        name: "累积 LTV", type: "line", smooth: true, data: [0, 120, 300, 560, 890, 1080, 1210],
        areaStyle: { opacity: 0.15 }, markLine: { silent: true, symbol: "none", lineStyle: { color: "#D9500B", type: "dashed" }, data: [{ yAxis: 600, name: "CAC 参考线" }] },
      }],
    },
  },
  {
    id: "conversion-rate", title: "营销转化率分析", unit: "%",
    desc: "按周跟踪转化率变化，配合实验判断优化是否生效。",
    option: {
      color: ["#EE6514", "#123B57"],
      tooltip: { ...baseTooltip, trigger: "axis", valueFormatter: (v: number) => `${v}%` },
      legend: { ...baseLegend, top: 0 },
      grid: { left: 48, right: 16, top: 40, bottom: 30 },
      xAxis: { type: "category", boundaryGap: false, data: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"], axisLabel: baseText },
      yAxis: { type: "value", name: "%", nameTextStyle: baseText, axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [
        { name: "访问→注册", type: "line", smooth: true, data: [18.2, 19.5, 20.1, 22.4, 23.8, 25.2, 26.1, 27.5] },
        { name: "注册→购买", type: "line", smooth: true, data: [8.1, 8.6, 9.2, 9.0, 10.4, 11.2, 11.8, 12.6] },
      ],
    },
  },
  {
    id: "positioning-scatter", title: "产品市场定位", unit: "评分",
    desc: "以价格与功能为坐标轴，观察各产品在市场中的位置。",
    option: {
      tooltip: { ...baseTooltip, trigger: "item", formatter: (p: { data: number[]; name: string }) => `${p.name}<br/>功能 ${p.data[0]} · 价格 ${p.data[1]}` },
      grid: { left: 52, right: 30, top: 30, bottom: 40 },
      xAxis: { type: "value", name: "功能完整度", nameLocation: "middle", nameGap: 28, min: 0, max: 100, nameTextStyle: baseText, axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      yAxis: { type: "value", name: "价格指数", min: 0, max: 100, nameTextStyle: baseText, axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [{
        type: "scatter", symbolSize: 18,
        data: [
          { value: [72, 78], name: "产品 A", itemStyle: { color: "#123B57" } },
          { value: [45, 40], name: "产品 B", itemStyle: { color: "#858C91" } },
          { value: [88, 92], name: "产品 C", itemStyle: { color: "#6D3BA8" } },
          { value: [35, 25], name: "产品 D", itemStyle: { color: "#858C91" } },
          { value: [68, 45], name: "你的产品", itemStyle: { color: "#EE6514" } },
        ],
        label: { show: true, position: "top", formatter: "{b}", color: "#4E565B", fontSize: 11 },
      }],
    },
  },
  {
    id: "retention", title: "用户留存趋势", unit: "%",
    desc: "按 cohort 观察留存曲线，判断产品价值是否持续。",
    option: {
      color: ["#EE6514", "#123B57", "#1E4D42"],
      tooltip: { ...baseTooltip, trigger: "axis", valueFormatter: (v: number) => `${v}%` },
      legend: { ...baseLegend, top: 0 },
      grid: { left: 48, right: 16, top: 40, bottom: 30 },
      xAxis: { type: "category", boundaryGap: false, data: ["D1", "D7", "D14", "D30", "D60", "D90"], axisLabel: baseText },
      yAxis: { type: "value", name: "%", max: 100, nameTextStyle: baseText, axisLabel: baseText, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [
        { name: "1月 cohort", type: "line", smooth: true, data: [68, 52, 44, 36, 29, 25] },
        { name: "3月 cohort", type: "line", smooth: true, data: [72, 58, 50, 43, 36, 32] },
        { name: "6月 cohort", type: "line", smooth: true, data: [76, 64, 57, 51, 45, 41] },
      ],
    },
  },
];

export const chartById = Object.fromEntries(chartDefinitions.map((c) => [c.id, c])) as Record<string, ChartDefinition>;
