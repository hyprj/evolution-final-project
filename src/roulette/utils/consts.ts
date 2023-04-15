import { Multiplier, NumericBetValue, TextBetValue } from "./types";

export const NUMERIC_BET_VALUES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
] as const;

export const RED_NUMBERS = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
] as const;

export const NUMERIC_MULTIPLIER = 35;

export const TEXT_BET_VALUES_1_TO_2 = [
  "odd",
  "even",
  "red",
  "black",
  "1-18",
  "19-36",
] as const;

export const TEXT_BET_VALUES_1_TO_3 = [
  "1st12",
  "2nd12",
  "3rd12",
  "3-36",
  "2-35",
  "1-34",
] as const;

export const TEXT_BET_VALUES = [
  ...TEXT_BET_VALUES_1_TO_2,
  ...TEXT_BET_VALUES_1_TO_3,
] as const;

export const textBetValuesNumbers: Record<TextBetValue, NumericBetValue[]> = {
  "1-18": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  "19-36": [
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ],
  "1-34": [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  "2-35": [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  "3-36": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  "1st12": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "2nd12": [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "3rd12": [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35],
  red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
  even: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
  odd: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
};

export const multipliers: Record<TextBetValue, Multiplier> = {
  "1-18": 2,
  "1-34": 3,
  "19-36": 2,
  "1st12": 3,
  "2-35": 3,
  "2nd12": 3,
  "3-36": 3,
  "3rd12": 3,
  black: 2,
  even: 2,
  odd: 2,
  red: 2,
};

export const BET_VALUES = [...NUMERIC_BET_VALUES, ...TEXT_BET_VALUES] as const;
