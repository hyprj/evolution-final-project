import { BET_VALUES, multipliers, textBetValuesNumbers } from "./consts";
import { BetValue, Multiplier, NumericBetValue } from "./types";

const HIGHTEST_NUMERIC_BET_VALUE = 36;

export function isBetValue(value: unknown): value is BetValue {
  return BET_VALUES.includes(normalizeBetValue(value as BetValue));
}

export function getRandomWinningNumber(): NumericBetValue {
  return Math.floor(
    Math.random() * HIGHTEST_NUMERIC_BET_VALUE
  ) as NumericBetValue;
}

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

export function getMultiplier(betValue: BetValue): Multiplier {
  if (typeof betValue === "number") {
    return 35;
  }
  return multipliers[betValue];
}

export const sumArray = (numbers: number[]) =>
  numbers.reduce((acc, curr) => (acc += curr), 0);
