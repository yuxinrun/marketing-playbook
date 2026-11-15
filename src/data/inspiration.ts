import type { Inspiration } from "@/types";

export const inspirations: Inspiration[] = [
  {
    type: "经典",
    text: "营销的目的，是充分理解顾客，让产品或服务恰好契合顾客并自我销售。",
    source: "Peter Drucker，《管理的实践》（The Practice of Management, 1954）中的相关论述",
    verified: true,
  },
  {
    type: "经典",
    text: "顾客想要的不是四分之一英寸的钻头，而是四分之一英寸的孔。",
    source: "Theodore Levitt，《营销近视症》（Marketing Myopia），Harvard Business Review, 1960",
    verified: true,
  },
  {
    type: "经典",
    text: "消费者不是傻瓜，她是你的妻子。",
    source: "David Ogilvy，《一个广告人的自白》（Confessions of an Advertising Man, 1963）",
    verified: true,
  },
  {
    type: "经典",
    text: "定位不是你对产品做的事，而是你对潜在顾客心智做的事。",
    source: "Al Ries & Jack Trout，《定位》（Positioning, 1981）核心观点",
    verified: true,
  },
  {
    type: "经典",
    text: "品牌是期望、记忆、故事与关系的总和，它决定了消费者为何选择你而非他人。",
    source: "Seth Godin，《这就是营销》（This Is Marketing, 2018）中的品牌定义意译",
    verified: true,
  },
  {
    type: "观点",
    text: "大多数增长问题，本质上不是流量不够，而是价值主张没有被说清楚。",
    source: "营销实战指南 · 编辑原创",
    verified: false,
  },
  {
    type: "观点",
    text: "定位的敌人不是竞争对手，而是用户心智里那个「都差不多」。",
    source: "营销实战指南 · 编辑原创",
    verified: false,
  },
  {
    type: "观点",
    text: "内容不是发布得越多越好，而是在正确的问题上，持续给出值得被记住的答案。",
    source: "营销实战指南 · 编辑原创",
    verified: false,
  },
  {
    type: "行动",
    text: "今天挑一个你熟悉的品牌，写下它的一句话定位，以及它在用户心智中占据的那个词。",
    source: "营销实战指南 · 今日行动",
    verified: false,
    action: "定位拆解练习",
  },
  {
    type: "行动",
    text: "打开最近一次营销活动的数据，找出漏斗中流失最大的一个环节，只针对它提出一个改进假设。",
    source: "营销实战指南 · 今日行动",
    verified: false,
    action: "漏斗诊断练习",
  },
  {
    type: "行动",
    text: "访问一位真实用户，不要推销，只问：你为什么选择我们，又在什么时刻差点放弃？",
    source: "营销实战指南 · 今日行动",
    verified: false,
    action: "用户访谈练习",
  },
];

export function inspirationOfDay(day = new Date().getDate()) {
  return inspirations[day % inspirations.length];
}
