import { TEXT_BET_VALUES, NUMERIC_BET_VALUES, BET_VALUES } from "./consts";

export type TextBetValue = (typeof TEXT_BET_VALUES)[number];

export type NumericBetValue = (typeof NUMERIC_BET_VALUES)[number];

export type BetValue = (typeof BET_VALUES)[number];

export type ChipValue = 1 | 5 | 10;

export type Multiplier = 2 | 3 | 35;
