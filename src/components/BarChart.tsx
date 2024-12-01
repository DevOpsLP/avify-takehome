import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import {
  LocalFireDepartment,
  Science,
  WbSunny,
  Air,
  Water,
  ImportExport,
  LightMode,
  EnergySavingsLeaf,
} from '@mui/icons-material';
import CustomTooltip from './Tooltip';
import { VerticalBarChartProps } from '../types';
import { COLOR_MAP } from '@/utils/iconMap';

// Map of icons for each fuel type
const ICON_MAP: Record<string, React.ReactNode> = {
  biomass: <EnergySavingsLeaf sx={{ color: COLOR_MAP.biomass, fontSize: 30 }} />,
  coal: <LocalFireDepartment sx={{ color: COLOR_MAP.coal, fontSize: 30 }} />,
  gas: <LocalFireDepartment sx={{ color: COLOR_MAP.gas, fontSize: 30 }} />,
  nuclear: <Science sx={{ color: COLOR_MAP.nuclear, fontSize: 30 }} />,
  hydro: <Water sx={{ color: COLOR_MAP.hydro, fontSize: 30 }} />,
  solar: <WbSunny sx={{ color: COLOR_MAP.solar, fontSize: 30 }} />,
  wind: <Air sx={{ color: COLOR_MAP.wind, fontSize: 30 }} />,
  imports: <ImportExport sx={{ color: COLOR_MAP.imports, fontSize: 30 }} />,
  other: <LightMode sx={{ color: COLOR_MAP.others, fontSize: 30 }} />,
};
// Custom tick renderer for icons and labels
const renderCustomAxisTick = ({ x, y, payload }: { x: number; y: number; payload: { value: string } }) => {
  const icon = ICON_MAP[payload.value.toLowerCase()] || null;

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-30} y={-15} width={40} height={40}>
        {icon}
      </foreignObject>
    </g>
  );
};

// Vertical bar chart component
const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data }) => {
  const sortedData = [...data]
  .filter((item) => item.perc !== 0 || item.fuel.toLowerCase() === 'other') // Exclude "0%" except for "others"
  .sort((a, b) =>  a.perc - b.perc);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Define colors for default and hover states
  const defaultColor = '#1847f2';
  const hoverColor = '#5642ed';

  return (
    <ResponsiveContainer width="90%" height={700}>
      <BarChart
        layout="vertical"
        data={sortedData}
        margin={{ top: 20, right: 30, left: -100, bottom: 20 }}
      >
        <CartesianGrid stroke="#ddd" horizontal={false} vertical={true} />
        <XAxis type="number" />
        <YAxis dataKey="fuel" type="category" width={200} tick={renderCustomAxisTick}/>
        <Tooltip content={<CustomTooltip payload={undefined} label={undefined} active={undefined} />} cursor={{ fill: 'transparent' }} />
        <Bar
          dataKey="perc"
          barSize={45}
          onMouseLeave={handleMouseLeave} // Reset hover state when leaving the chart
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={hoveredIndex === index ? hoverColor : defaultColor} // Conditional color
              onMouseEnter={() => handleMouseEnter(index)} // Set hover state
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
