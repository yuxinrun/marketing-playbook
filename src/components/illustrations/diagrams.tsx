import { cn } from "@/lib/utils";

const INK = "#191C1E";
const SOFT = "#858C91";
const ORANGE = "#EE6514";
const NAVY = "#123B57";
const GREEN = "#1E4D42";
const CREAM = "#F7F4ED";
const LINE = "#E5DDCB";

function Wrap({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-cream-300 bg-cream-100", className)}>
      <svg viewBox="0 0 720 360" className="h-auto w-full" role="img" aria-label={label}>{children}</svg>
    </div>
  );
}

export function JourneyMapSvg({ className }: { className?: string }) {
  const stages = [
    { t: "认知", d: "发现问题", c: NAVY },
    { t: "考虑", d: "搜集信息", c: "#1D5679" },
    { t: "比较", d: "评估方案", c: ORANGE },
    { t: "购买", d: "做出选择", c: "#D9500B" },
    { t: "拥护", d: "推荐他人", c: GREEN },
  ];
  return (
    <Wrap label="用户旅程地图：认知、考虑、比较、购买、拥护" className={className}>
      <rect width="720" height="360" fill={CREAM} />
      <text x="360" y="46" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">用户旅程地图</text>
      <line x1="60" y1="120" x2="660" y2="120" stroke={LINE} strokeWidth="3" />
      {stages.map((s, i) => {
        const x = 90 + i * 135;
        return (
          <g key={s.t}>
            <circle cx={x} cy="120" r="20" fill={s.c} />
            <text x={x} y="126" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{i + 1}</text>
            <text x={x} y="170" textAnchor="middle" fill={INK} fontSize="15" fontWeight="700">{s.t}</text>
            <text x={x} y="194" textAnchor="middle" fill={SOFT} fontSize="12">{s.d}</text>
            <rect x={x - 50} y="220" width="100" height="66" rx="8" fill="#fff" stroke={LINE} />
            <text x={x} y="248" textAnchor="middle" fill={SOFT} fontSize="10">触点</text>
            <text x={x} y="270" textAnchor="middle" fill={INK} fontSize="11">
              {["广告/内容", "搜索/社媒", "案例/对比", "页面/销售", "服务/社群"][i]}
            </text>
          </g>
        );
      })}
      <text x="360" y="325" textAnchor="middle" fill={SOFT} fontSize="12">在每一阶段识别用户问题、情绪与流失风险</text>
    </Wrap>
  );
}

export function SwotSvg({ className }: { className?: string }) {
  const quads = [
    { x: 60, y: 70, t: "优势 Strengths", d: "内部 · 有利", c: GREEN },
    { x: 380, y: 70, t: "劣势 Weaknesses", d: "内部 · 不利", c: ORANGE },
    { x: 60, y: 210, t: "机会 Opportunities", d: "外部 · 有利", c: NAVY },
    { x: 380, y: 210, t: "威胁 Threats", d: "外部 · 不利", c: "#8E3012" },
  ];
  return (
    <Wrap label="SWOT 四象限分析图" className={className}>
      <rect width="720" height="360" fill={CREAM} />
      <text x="360" y="46" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">SWOT 四象限</text>
      {quads.map((q) => (
        <g key={q.t}>
          <rect x={q.x} y={q.y} width="280" height="120" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
          <rect x={q.x} y={q.y} width="280" height="5" rx="2.5" fill={q.c} />
          <text x={q.x + 20} y={q.y + 44} fill={INK} fontSize="16" fontWeight="700">{q.t.split(" ")[0]}</text>
          <text x={q.x + 20} y={q.y + 68} fill={q.c} fontSize="12" fontWeight="600">{q.t.split(" ")[1]}</text>
          <text x={q.x + 20} y={q.y + 98} fill={SOFT} fontSize="12">{q.d}</text>
          <line x1={q.x + 20} y1={q.y + 108} x2={q.x + 260} y2={q.y + 108} stroke={LINE} strokeDasharray="3 4" />
        </g>
      ))}
    </Wrap>
  );
}

export function ResearchFlowSvg({ className }: { className?: string }) {
  const steps = ["定义问题", "设计方案", "收集数据", "分析验证", "输出结论"];
  return (
    <Wrap label="市场调研流程图" className={className}>
      <rect width="720" height="360" fill={CREAM} />
      <text x="360" y="52" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">市场调研流程</text>
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={40 + i * 136} y="140" width="120" height="80" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
          <circle cx={100 + i * 136} cy="128" r="15" fill={i === 4 ? ORANGE : NAVY} />
          <text x={100 + i * 136} y="133" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{i + 1}</text>
          <text x={100 + i * 136} y="188" textAnchor="middle" fill={INK} fontSize="14" fontWeight="600">{s}</text>
          {i < steps.length - 1 && (
            <path d={`M${164 + i * 136} 180 L${172 + i * 136} 180`} stroke={ORANGE} strokeWidth="2" />
          )}
        </g>
      ))}
      <text x="360" y="280" textAnchor="middle" fill={SOFT} fontSize="12">案头研究 → 定性访谈 → 定量验证 → 交叉检验</text>
      <text x="360" y="306" textAnchor="middle" fill={ORANGE} fontSize="12" fontWeight="600">调研的价值是减少决策风险，而不是收集数据</text>
    </Wrap>
  );
}

export function ContentWorkflowSvg({ className }: { className?: string }) {
  const nodes = [
    { x: 60, y: 80, t: "用户问题", c: NAVY },
    { x: 260, y: 80, t: "主题支柱", c: "#1D5679" },
    { x: 460, y: 80, t: "内容生产", c: ORANGE },
    { x: 460, y: 230, t: "多渠道分发", c: "#D9500B" },
    { x: 260, y: 230, t: "转化设计", c: GREEN },
    { x: 60, y: 230, t: "衡量迭代", c: "#6D3BA8" },
  ];
  return (
    <Wrap label="内容营销工作流" className={className}>
      <rect width="720" height="360" fill={CREAM} />
      <text x="360" y="46" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">内容营销工作流</text>
      {nodes.map((n, i) => (
        <g key={n.t}>
          <rect x={n.x} y={n.y} width="180" height="72" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
          <rect x={n.x} y={n.y} width="5" height="72" rx="2.5" fill={n.c} />
          <text x={n.x + 22} y={n.y + 44} fill={INK} fontSize="15" fontWeight="600">{n.t}</text>
          {i < 2 && <path d={`M${n.x + 184} ${n.y + 36} L${n.x + 256} ${n.y + 36}`} stroke={ORANGE} strokeWidth="2" />}
        </g>
      ))}
      <path d="M640 152 L640 230" stroke={ORANGE} strokeWidth="2" />
      <path d="M456 266 L244 266" stroke={ORANGE} strokeWidth="2" />
      <path d="M256 230 L256 152" stroke={ORANGE} strokeWidth="2" />
      <text x="360" y="340" textAnchor="middle" fill={SOFT} fontSize="12">内容不是发布出去就结束，而是进入循环才有复利</text>
    </Wrap>
  );
}

export function ChannelMapSvg({ className }: { className?: string }) {
  return (
    <Wrap label="营销渠道关系图" className={className}>
      <rect width="720" height="360" fill={CREAM} />
      <text x="360" y="46" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">营销渠道关系图</text>
      <circle cx="360" cy="195" r="62" fill={NAVY} />
      <text x="360" y="190" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700">品牌</text>
      <text x="360" y="214" textAnchor="middle" fill="#ffffffaa" fontSize="11">中心资产</text>
      {[
        { x: 120, y: 100, t: "内容SEO", c: ORANGE },
        { x: 600, y: 100, t: "付费广告", c: "#1D5679" },
        { x: 120, y: 290, t: "社交媒体", c: GREEN },
        { x: 600, y: 290, t: "私域CRM", c: "#8E3012" },
        { x: 360, y: 320, t: "线下体验", c: "#6D3BA8" },
      ].map((n) => (
        <g key={n.t}>
          <line x1="360" y1="195" x2={n.x + 45} y2={n.y + 18} stroke={LINE} strokeWidth="2" strokeDasharray="4 4" />
          <rect x={n.x} y={n.y} width="130" height="42" rx="10" fill="#fff" stroke={n.c} strokeWidth="1.5" />
          <text x={n.x + 65} y={n.y + 26} textAnchor="middle" fill={n.c} fontSize="13" fontWeight="700">{n.t}</text>
        </g>
      ))}
      <text x="360" y="82" textAnchor="middle" fill={SOFT} fontSize="12">渠道服务于同一品牌资产，而非各自为战</text>
    </Wrap>
  );
}
