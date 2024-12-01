import React from 'react';
import { Typography, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { FuelGridProps } from '@/types'; // Import types
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
import { PieChart, Pie, Cell } from 'recharts';
import { COLOR_MAP } from '@/utils/iconMap';
import { hexToRGBA } from '@/utils/hex-to-rgba';

const Grid = Grid2; // For semantic use only

// Map of icons for each fuel type
const ICON_MAP: Record<string, React.ReactNode> = {
  biomass: <EnergySavingsLeaf sx={{ color: COLOR_MAP.biomass, fontSize: 40 }} />,
  coal: <LocalFireDepartment sx={{ color: COLOR_MAP.coal, fontSize: 40 }} />,
  gas: <LocalFireDepartment sx={{ color: COLOR_MAP.gas, fontSize: 40 }} />,
  nuclear: <Science sx={{ color: COLOR_MAP.nuclear, fontSize: 40 }} />,
  hydro: <Water sx={{ color: COLOR_MAP.hydro, fontSize: 40 }} />,
  solar: <WbSunny sx={{ color: COLOR_MAP.solar, fontSize: 40 }} />,
  wind: <Air sx={{ color: COLOR_MAP.wind, fontSize: 40 }} />,
  imports: <ImportExport sx={{ color: COLOR_MAP.imports, fontSize: 40 }} />,
  other: <LightMode sx={{ color: COLOR_MAP.others, fontSize: 40 }} />,
};


const FuelGrid: React.FC<FuelGridProps> = ({ data }) => {
  // Sort the data by percentage in descending order
  const sortedData = [...data].sort((a, b) => b.perc - a.perc);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {sortedData.map((item, index) => {
          const pieData = [
            { name: 'filled', value: item.perc },
            { name: 'unfilled', value: 100 - item.perc },
          ];

          const color = COLOR_MAP[item.fuel.toLowerCase()] || '#8884d8';

          return (
            <Grid
              key={index}
              size={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: 3,

              }}
            >
              {/* PieChart */}
              <PieChart width={80} height={80} >
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={30}
                  outerRadius={40}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  <Cell key="filled" fill={color} />
                  <Cell key="unfilled" fill={hexToRGBA(color, 0.2)} />
                </Pie>
              </PieChart>
              
              {/* Percentage */}
              <Typography className="number" variant="h5" sx={{ marginTop: 1 }}>
                {item.perc}%
              </Typography>
              
              {/* Fuel type name with Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  marginTop: 1,
                }}
              >
                {ICON_MAP[item.fuel.toLowerCase()] || (
                  <LightMode sx={{ color: '#8884d8', fontSize: 40 }} />
                )}
                <Typography
                  className="grid-text"
                  color="text.secondary"
                >
                  {item.fuel}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FuelGrid;
