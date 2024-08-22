import {
  ResponsiveContainer,
  PieChart,
  Legend,
  Pie,
  Cell,
  Tooltip,
  Label,
} from "recharts";
import CustomTooltip from "../custom-tooltip";
import { useMemo } from "react";
import { ChartNoAxesCombined } from "lucide-react";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

const ChartPeiVariant = ({ data }: Props) => {
  const totalValue = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  if(data.length === 0) {
    return (
      <div className="flex flex-col h-[150px] w-full items-center justify-center text-muted-foreground">
        <ChartNoAxesCombined className="size-7"/>
        <p className="text-sm">No Graph data available!</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={150}  className="">
      <PieChart>
        <Legend
          layout="centric"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          content={({ payload }) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">{entry.payload?.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={data}
          cx="25%"
          cy="50%"
          outerRadius={75}
          innerRadius={50}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      {totalValue.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground text-sm"
                    >
                      Total
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPeiVariant;
