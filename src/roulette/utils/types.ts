import {
  TEXT_BET_VALUES,
  NUMERIC_BET_VALUES,
  BET_VALUES,
  CHIP_VALUES,
} from "./consts";

export type TextBetValue = (typeof TEXT_BET_VALUES)[number];

export type NumericBetValue = (typeof NUMERIC_BET_VALUES)[number];

export type BetValue = (typeof BET_VALUES)[number];

export type ChipValue = (typeof CHIP_VALUES)[number];

export type Multiplier = 2 | 3 | 35;

export interface Bet {
  value: BetValue;
  chips: ChipValue[];
}
