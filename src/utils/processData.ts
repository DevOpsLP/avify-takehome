import { GenerationMix } from "@/types";

export const processData = (data: GenerationMix[]): GenerationMix[] => {
  const other = { fuel: 'other', perc: 0 };

  const filteredData = data
    .filter((item) => item.perc > 0 && item.fuel !== 'other') // Exclude "other" from input
    .map((item) => {
      if (item.perc <= 1) {
        other.perc += item.perc; // Accumulate small percentages in "other"
        return null;
      }
      return item;
    })
    .filter(Boolean) as GenerationMix[];

  // Add "other" only if it has a non-zero percentage
  if (other.perc > 0) {
    filteredData.push(other);
  }

  return filteredData;
};
