import { GenerationMix } from "@/types";
import { processData } from "./processData";

test('filters out items with 0% unless fuel is "other"', () => {
  const input: GenerationMix[] = [
    { fuel: 'Solar', perc: 25 },
    { fuel: 'Wind', perc: 0 },
    { fuel: 'other', perc: 0 },
  ];
  const result = processData(input);
  expect(result).toEqual([
    { fuel: 'Solar', perc: 25 },
  ]); // "other" is not included because its percentage is 0
});

  
  test('accumulates small percentages into "other"', () => {
    const input: GenerationMix[] = [
      { fuel: 'Solar', perc: 25 },
      { fuel: 'Wind', perc: 0.5 },
      { fuel: 'Gas', perc: 0.3 },
      { fuel: 'Coal', perc: 50 },
    ];
    const result = processData(input);
    expect(result).toEqual([
      { fuel: 'Solar', perc: 25 },
      { fuel: 'Coal', perc: 50 },
      { fuel: 'other', perc: 0.8 },
    ]);
  });
  
  test('retains all valid data above 1%', () => {
    const input: GenerationMix[] = [
      { fuel: 'Solar', perc: 15 },
      { fuel: 'Wind', perc: 20 },
      { fuel: 'Gas', perc: 30 },
    ];
    const result = processData(input);
    expect(result).toEqual([
      { fuel: 'Solar', perc: 15 },
      { fuel: 'Wind', perc: 20 },
      { fuel: 'Gas', perc: 30 },
    ]);
  });
  
