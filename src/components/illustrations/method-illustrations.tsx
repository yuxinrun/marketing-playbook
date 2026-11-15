import { cn } from "@/lib/utils";

type IllustrationType = "stp" | "4p" | "aida" | "aarrr" | "race" | "flywheel" | "positioning" | "funnel";

const INK = "#191C1E";
const SOFT = "#858C91";
const ORANGE = "#EE6514";
const NAVY = "#123B57";
const GREEN = "#1E4D42";
const CREAM = "#F7F4ED";
const LINE = "#E5DDCB";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 720 380" className="h-auto w-full" role="img" aria-label={label}>
      <defs>
        <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill={ORANGE} />
        </marker>
        <marker id="arrow-navy" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill={NAVY} />
        </marker>
      </defs>
      <rect width="720" height="380" rx="16" fill={CREAM} />
      {children}
    </svg>
  );
}

function StpSvg() {
  const steps = [
    { x: 40, n: "01", t: "市场细分", d: "切分需求", c: NAVY },
    { x: 260, n: "02", t: "目标选择", d: "选择战场", c: ORANGE },
    { x: 480, n: "03", t: "市场定位", d: "占据心智", c: GREEN },
  ];
  return (
    <Frame label="STP 战略流程图：市场细分、目标选择、市场定位">
      {steps.map((s, i) => (
        <g key={s.n}>
          <rect x={s.x} y="110" width="200" height="160" rx="14" fill="#fff" stroke={LINE} strokeWidth="1.5" />
          <rect x={s.x} y="110" width="200" height="6" rx="3" fill={s.c} />
          <text x={s.x + 20} y="158" fill={s.c} fontSize="13" fontWeight="700" letterSpacing="1">{s.n}</text>
          <text x={s.x + 20} y="196" fill={INK} fontSize="21" fontWeight="700">{s.t}</text>
          <text x={s.x + 20} y="226" fill={SOFT} fontSize="14">{s.d}</text>
          <text x={s.x + 20} y="250" fill={SOFT} fontSize="11">{["Where to play?", "Who to serve?", "Why choose you?"][i]}</text>
          {i < 2 && <path d={`M${s.x + 204} 190 L${s.x + 254} 190`} stroke={ORANGE} strokeWidth="2" markerEnd="url(#arrow-orange)" />}
        </g>
      ))}
      <text x="360" y="68" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">从市场到心智：STP 三步法</text>
      <text x="360" y="330" textAnchor="middle" fill={SOFT} fontSize="12">细分决定视角 · 选择决定资源 · 定位决定被选择的理由</text>
    </Frame>
  );
}

function FourPSvg() {
  const items = [
    { x: 70, y: 90, t: "Product", zh: "产品", d: "价值与差异", c: NAVY },
    { x: 390, y: 90, t: "Price", zh: "价格", d: "感知与利润", c: ORANGE },
    { x: 70, y: 220, t: "Place", zh: "渠道", d: "触达与便利", c: GREEN },
    { x: 390, y: 220, t: "Promotion", zh: "促销", d: "沟通与说服", c: "#6D3BA8" },
  ];
  return (
    <Frame label="4P 营销组合模型：产品、价格、渠道、促销">
      <text x="360" y="58" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">4P 营销组合</text>
      {items.map((it) => (
        <g key={it.t}>
          <rect x={it.x} y={it.y} width="260" height="110" rx="14" fill="#fff" stroke={LINE} strokeWidth="1.5" />
          <circle cx={it.x + 34} cy={it.y + 36} r="14" fill={it.c} />
          <text x={it.x + 34} y={it.y + 41} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{it.zh[0]}</text>
          <text x={it.x + 60} y={it.y + 42} fill={INK} fontSize="19" fontWeight="700">{it.t}</text>
          <text x={it.x + 24} y={it.y + 80} fill={SOFT} fontSize="14">{it.zh} · {it.d}</text>
        </g>
      ))}
      <circle cx="360" cy="210" r="30" fill={CREAM} stroke={LINE} strokeWidth="1.5" />
      <text x="360" y="216" textAnchor="middle" fill={INK} fontSize="13" fontWeight="700">顾客</text>
    </Frame>
  );
}

function AidaSvg() {
  const steps = [
    { w: 560, x: 80, t: "注意 Attention", c: NAVY },
    { w: 490, x: 115, t: "兴趣 Interest", c: "#1D5679" },
    { w: 420, x: 150, t: "欲望 Desire", c: ORANGE },
    { w: 350, x: 185, t: "行动 Action", c: GREEN },
  ];
  return (
    <Frame label="AIDA 消费者决策流程：注意、兴趣、欲望、行动">
      <text x="360" y="58" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">AIDA：从注意到行动</text>
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={s.x} y={100 + i * 58} width={s.w} height="50" rx="8" fill={s.c} />
          <text x={s.x + 20} y={131 + i * 58} fill="#fff" fontSize="15" fontWeight="600">{s.t}</text>
          <text x={360} y={131 + i * 58} textAnchor="middle" fill="#ffffffcc" fontSize="12">
            {["争取注意", "激发兴趣", "创造渴望", "促进行动"][i]}
          </text>
        </g>
      ))}
      <path d="M660 130 L660 300" stroke={ORANGE} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-orange)" />
      <text x="360" y="355" textAnchor="middle" fill={SOFT} fontSize="12">越往下，人数越少，但意向越强</text>
    </Frame>
  );
}

function AarrrSvg() {
  const stages = [
    { x: 60, t: "获取", en: "Acquisition", c: NAVY },
    { x: 190, t: "激活", en: "Activation", c: "#1D5679" },
    { x: 320, t: "留存", en: "Retention", c: ORANGE },
    { x: 450, t: "收入", en: "Revenue", c: "#D9500B" },
    { x: 580, t: "推荐", en: "Referral", c: GREEN },
  ];
  return (
    <Frame label="AARRR 增长模型：获取、激活、留存、收入、推荐">
      <text x="360" y="58" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">AARRR 增长漏斗</text>
      {stages.map((s, i) => (
        <g key={s.t}>
          <path
            d={`M${s.x} 120 L${s.x + 96} 120 L${s.x + 74} ${270 - i * 6} L${s.x + 22} ${270 - i * 6} Z`}
            fill={s.c}
          />
          <text x={s.x + 48} y="160" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">{s.t}</text>
          <text x={s.x + 48} y="180" textAnchor="middle" fill="#ffffffcc" fontSize="9">{s.en}</text>
        </g>
      ))}
      <text x="360" y="315" textAnchor="middle" fill={SOFT} fontSize="12">每一阶段都是一个可诊断的转化环节</text>
      <text x="360" y="340" textAnchor="middle" fill={ORANGE} fontSize="12" fontWeight="600">留存决定增长能否复利</text>
    </Frame>
  );
}

function RaceSvg() {
  const items = [
    { x: 60, y: 90, t: "触达 Reach", c: NAVY },
    { x: 380, y: 90, t: "互动 Act", c: "#1D5679" },
    { x: 380, y: 230, t: "转化 Convert", c: ORANGE },
    { x: 60, y: 230, t: "参与 Engage", c: GREEN },
  ];
  return (
    <Frame label="RACE 数字营销框架：触达、互动、转化、参与">
      <text x="360" y="58" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">RACE 数字营销循环</text>
      {items.map((it, i) => (
        <g key={it.t}>
          <rect x={it.x} y={it.y} width="270" height="90" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
          <rect x={it.x} y={it.y} width="5" height="90" rx="2.5" fill={it.c} />
          <text x={it.x + 24} y={it.y + 42} fill={INK} fontSize="18" fontWeight="700">{it.t}</text>
          <text x={it.x + 24} y={it.y + 68} fill={SOFT} fontSize="13">{["建立认知", "产生互动", "完成转化", "长期关系"][i]}</text>
        </g>
      ))}
      <path d="M335 135 L375 135" stroke={ORANGE} strokeWidth="2" markerEnd="url(#arrow-orange)" />
      <path d="M515 185 L515 225" stroke={ORANGE} strokeWidth="2" markerEnd="url(#arrow-orange)" />
      <path d="M385 275 L335 275" stroke={ORANGE} strokeWidth="2" markerEnd="url(#arrow-orange)" />
      <path d="M205 225 L205 185" stroke={ORANGE} strokeWidth="2" markerEnd="url(#arrow-orange)" />
    </Frame>
  );
}

function FlywheelSvg() {
  return (
    <Frame label="增长飞轮：用户体验、口碑内容、规模效率、再投入形成循环">
      <text x="360" y="58" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">增长飞轮：越转越省力</text>
      <circle cx="360" cy="210" r="108" fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 8" />
      <circle cx="360" cy="210" r="62" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <text x="360" y="205" textAnchor="middle" fill={INK} fontSize="17" fontWeight="700">用户</text>
      <text x="360" y="228" textAnchor="middle" fill={ORANGE} fontSize="14" fontWeight="600">体验</text>
      {[
        { a: -90, t: "口碑与内容", c: ORANGE },
        { a: 0, t: "规模效率", c: NAVY },
        { a: 90, t: "再投入", c: GREEN },
        { a: 180, t: "产品价值", c: "#6D3BA8" },
      ].map((it) => {
        const rad = (it.a * Math.PI) / 180;
        const x = 360 + Math.cos(rad) * 108;
        const y = 210 + Math.sin(rad) * 108;
        return (
          <g key={it.t}>
            <circle cx={x} cy={y} r="40" fill={it.c} />
            <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{it.t}</text>
          </g>
        );
      })}
      <path d="M400 112 A108 108 0 0 1 468 210" fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#arrow-navy)" />
      <text x="360" y="355" textAnchor="middle" fill={SOFT} fontSize="12">每一次体验，都推动下一轮增长</text>
    </Frame>
  );
}

function PositioningSvg() {
  return (
    <Frame label="品牌定位二维象限图">
      <text x="360" y="52" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">品牌定位图：寻找心智空位</text>
      <rect x="110" y="80" width="500" height="240" fill="#fff" stroke={LINE} strokeWidth="1.5" rx="8" />
      <line x1="360" y1="80" x2="360" y2="320" stroke={LINE} strokeWidth="1.5" />
      <line x1="110" y1="200" x2="610" y2="200" stroke={LINE} strokeWidth="1.5" />
      <text x="360" y="70" textAnchor="middle" fill={SOFT} fontSize="11">高价值</text>
      <text x="360" y="338" textAnchor="middle" fill={SOFT} fontSize="11">低价值</text>
      <text x="96" y="204" textAnchor="middle" fill={SOFT} fontSize="11" transform="rotate(-90 96 204)">专业</text>
      <text x="626" y="204" textAnchor="middle" fill={SOFT} fontSize="11" transform="rotate(90 626 204)">大众</text>
      {[
        { x: 200, y: 130, t: "竞品 A", c: SOFT },
        { x: 250, y: 250, t: "竞品 B", c: SOFT },
        { x: 470, y: 150, t: "竞品 C", c: SOFT },
        { x: 500, y: 280, t: "竞品 D", c: SOFT },
      ].map((d) => (
        <g key={d.t}>
          <circle cx={d.x} cy={d.y} r="7" fill={d.c} />
          <text x={d.x + 12} y={d.y + 4} fill={SOFT} fontSize="12">{d.t}</text>
        </g>
      ))}
      <circle cx="180" cy="285" r="13" fill={ORANGE} />
      <text x="200" y="290" fill={ORANGE} fontSize="14" fontWeight="700">你的空位</text>
      <path d="M193 292 L200 291" stroke={ORANGE} strokeWidth="2" />
    </Frame>
  );
}

function FunnelSvg() {
  const rows = [
    { w: 520, x: 100, label: "曝光 100,000", c: NAVY },
    { w: 430, x: 145, label: "点击 12,000 · 12%", c: "#1D5679" },
    { w: 340, x: 190, label: "访问 9,600 · 80%", c: ORANGE },
    { w: 250, x: 235, label: "注册 1,920 · 20%", c: "#D9500B" },
    { w: 160, x: 280, label: "购买 288 · 15%", c: GREEN },
  ];
  return (
    <Frame label="营销漏斗图：曝光、点击、访问、注册、购买">
      <text x="360" y="52" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">营销漏斗：定位最大流失环节</text>
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x={r.x} y={78 + i * 52} width={r.w} height="42" rx="6" fill={r.c} />
          <text x="360" y={104 + i * 52} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">{r.label}</text>
        </g>
      ))}
      <text x="360" y="360" textAnchor="middle" fill={SOFT} fontSize="11">示例数据仅用于演示计算方法，不代表真实业务结果</text>
    </Frame>
  );
}

const map: Record<IllustrationType, () => React.JSX.Element> = {
  stp: StpSvg,
  "4p": FourPSvg,
  aida: AidaSvg,
  aarrr: AarrrSvg,
  race: RaceSvg,
  flywheel: FlywheelSvg,
  positioning: PositioningSvg,
  funnel: FunnelSvg,
};

export function MethodIllustration({ type, className }: { type: IllustrationType; className?: string }) {
  const Component = map[type] ?? StpSvg;
  return <div className={cn("overflow-hidden rounded-xl border border-cream-300 bg-cream-100", className)}><Component /></div>;
}
