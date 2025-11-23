"use client";

// Define type for summary metrics card props
type SummaryMetricsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const SummaryMetricsCard = ({title, value, subtitle}: SummaryMetricsCardProps) => {
  return (
    <div className="rounded-xl border bg-white px-4 py-3 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-1">
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      {subtitle && (
        <p className="text-[11px] text-gray-400 leading-tight">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SummaryMetricsCard;
