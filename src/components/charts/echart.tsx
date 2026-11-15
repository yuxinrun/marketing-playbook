"use client";

import * as React from "react";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart, FunnelChart, ScatterChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  GraphicComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsCoreOption } from "echarts/core";
import { cn } from "@/lib/utils";

echarts.use([
  BarChart, LineChart, PieChart, FunnelChart, ScatterChart,
  GridComponent, TooltipComponent, LegendComponent, MarkLineComponent, TitleComponent, GraphicComponent,
  CanvasRenderer,
]);

interface EChartProps {
  option: EChartsCoreOption;
  height?: number;
  className?: string;
}

export function EChart({ option, height = 320, className }: EChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chartRef = React.useRef<echarts.ECharts | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const chart = echarts.init(containerRef.current, undefined, { renderer: "canvas" });
    chartRef.current = chart;
    chart.setOption(option);

    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return <div ref={containerRef} style={{ height }} className={cn("w-full", className)} />;
}
