export default function RevenueBarChart({ data }) {
  const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);

  const yTicks = Array.from({ length: 5 }, (_, index) => {
    const ratio = (4 - index) / 4;
    const value = Math.round(maxRevenue * ratio);
    return {
      label: `${Math.round(value / 1000000)}M`,
      y: 20 + index * 55,
    };
  });

  const chartWidth = 640;
  const chartHeight = 280;
  const leftAxis = 56;
  const bottomAxis = 250;
  const innerWidth = chartWidth - leftAxis - 24;
  const slotWidth = innerWidth / data.length;
  const barWidth = Math.max(22, slotWidth * 0.48);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        role="img"
        aria-label="Biểu đồ doanh thu theo tháng"
        className="w-full h-80"
      >
        <rect
          x="0"
          y="0"
          width={chartWidth}
          height={chartHeight}
          fill="transparent"
        />

        {yTicks.map((tick) => (
          <g key={tick.y}>
            <line
              x1={leftAxis}
              y1={tick.y}
              x2={chartWidth - 16}
              y2={tick.y}
              stroke="rgba(16,4,4,0.1)"
              strokeDasharray="3 4"
            />
            <text
              x={leftAxis - 10}
              y={tick.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--color-text-secondary)"
            >
              {tick.label}
            </text>
          </g>
        ))}

        <line
          x1={leftAxis}
          y1={bottomAxis}
          x2={chartWidth - 16}
          y2={bottomAxis}
          stroke="rgba(16,4,4,0.2)"
        />

        {data.map((item, index) => {
          const ratio = item.revenue / maxRevenue;
          const barHeight = Math.max(8, ratio * 210);
          const x = leftAxis + index * slotWidth + (slotWidth - barWidth) / 2;
          const y = bottomAxis - barHeight;

          return (
            <g key={item.month}>
              <title>{`${item.month}: ${item.revenue.toLocaleString("vi-VN")} ₫`}</title>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="8"
                fill="var(--color-surface-raised)"
              />
              <text
                x={x + barWidth / 2}
                y={bottomAxis + 18}
                textAnchor="middle"
                fontSize="11"
                fill="var(--color-text-secondary)"
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
