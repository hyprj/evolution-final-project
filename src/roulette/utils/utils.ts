import { FIELDS, NUMERIC_FIELDS, nonNumericFieldNumbers } from "./consts";
import { Field, NonNumericField, NumericField } from "./types";

export function isBetValue(value: unknown): value is Field {
  return FIELDS.includes(normalizeBetValue(value as Field));
}
export function normalizeBetValue(value: Field): Field {
  return !Number.isNaN(Number(value)) ? (Number(value) as Field) : value;
}

export function isWinningValue(
  field: Field,
  winningNumber: NumericField
): boolean {
  if (field === winningNumber) {
    return true;
  }
  if (
    typeof field == "string" &&
    nonNumericFieldNumbers[field as NonNumericField].includes(winningNumber)
  ) {
    return true;
  }
  return false;
}

export function fieldToHoverByValue(field: Field): Field[] {
  if (NUMERIC_FIELDS.includes(field as any)) {
    return [field];
  }
  return [field, ...nonNumericFieldNumbers[field as NonNumericField]];
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
