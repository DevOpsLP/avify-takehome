// types.ts
export interface GenerationMix {
    fuel: string; 
    perc: number; 
  }
  
  export interface GenerationData {
    from: string; 
    to: string; 
    generationmix: GenerationMix[];
  }
  
  export interface FuelGridProps {
    data: GenerationMix[]; 
  }
  
  export interface VerticalBarChartProps {
    data: GenerationMix[];
  }
  