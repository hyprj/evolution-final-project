import {
  BET_VALUES,
  NUMERIC_BET_VALUES,
  multipliers,
  textBetValuesNumbers,
} from "./consts";
import { BetValue, Multiplier, NumericBetValue, TextBetValue } from "./types";

// const HIGHTEST_NUMERIC_BET_VALUE = 36;

export function isBetValue(value: unknown): value is BetValue {
  return BET_VALUES.includes(normalizeBetValue(value as BetValue));
}

// export function getRandomWinningNumber(): NumericBetValue {
//   return Math.floor(
//     Math.random() * HIGHTEST_NUMERIC_BET_VALUE
//   ) as NumericBetValue;
// }

export function normalizeBetValue(value: BetValue): BetValue {
  return !Number.isNaN(Number(value)) ? (Number(value) as BetValue) : value;
}

export function isWinningValue(
  betValue: BetValue,
  winningNumber: NumericBetValue
): boolean {
  if (betValue === winningNumber) {
    return true;
  }
  if (
    typeof betValue == "string" &&
    textBetValuesNumbers[betValue].includes(winningNumber)
  ) {
    return true;
  }
  return false;
}

export function fieldToHoverByValue(betValue: BetValue): BetValue[] {
  if (NUMERIC_BET_VALUES.includes(betValue as NumericBetValue)) {
    return [betValue];
  }
  return [betValue, ...textBetValuesNumbers[betValue as TextBetValue]];
}

export function getMultiplier(betValue: BetValue): Multiplier {
  if (typeof betValue === "number") {
    return 35;
  }
  return multipliers[betValue];
}

export const sumArray = (numbers: number[]) =>
  numbers.reduce((acc, curr) => (acc += curr), 0);

// use this to only copy the Bets Map
export function shallowCloneBetMap<T, K extends object | null>(map: Map<T, K>) {
  const copiedMap = new Map<T, K>();
  for (const [key, value] of map.entries()) {
    copiedMap.set(key, Object.create(value));
  }
  return copiedMap;
}
