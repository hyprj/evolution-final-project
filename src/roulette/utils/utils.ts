import {
  FIELDS,
  nonNumericFieldNumbers,
  NUMERIC_FIELDS,
  maxBetValues,
  SPLIT_FIELDS,
  COLOR_FIELDS,
  ROW_FIELDS,
  TWELVE_FIELDS,
  PARITY_FIELDS,
  STREET_FIELDS,
  LINE_FIELDS,
  CORNER_FIELDS,
} from "./consts";
import { Field, NonNumericField, NumericField } from "./types";

export function isField(value: unknown): value is Field {
  return FIELDS.includes(normalizeField(value as Field));
}
export function normalizeField(value: any): Field {
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

export const sumNumbers = (numbers: number[]) =>
  numbers.reduce((acc, curr) => (acc += curr), 0);

// use this to only copy the Bets Map
export function shallowCloneBetMap<T, K extends object | null>(map: Map<T, K>) {
  const copiedMap = new Map<T, K>();
  for (const [key, value] of map.entries()) {
    copiedMap.set(key, Object.create(value));
  }
  return copiedMap;
}

export function isBiggerThanMaxPossibleAmount(
  field: Field,
  amount: number
): boolean {
  if (NUMERIC_FIELDS.includes(field as any)) {
    return amount > maxBetValues.numeric;
  }
  if (COLOR_FIELDS.includes(field as any)) {
    return amount > maxBetValues.color;
  }
  if (PARITY_FIELDS.includes(field as any)) {
    return amount > maxBetValues.parity;
  }
  if (ROW_FIELDS.includes(field as any)) {
    return amount > maxBetValues.row;
  }
  if (TWELVE_FIELDS.includes(field as any)) {
    return amount > maxBetValues.twelve;
  }
  if (SPLIT_FIELDS.includes(field as any)) {
    return amount > maxBetValues.split;
  }
  if (STREET_FIELDS.includes(field as any)) {
    return amount > maxBetValues.street;
  }
  if (LINE_FIELDS.includes(field as any)) {
    return amount > maxBetValues.line;
  }
  if (CORNER_FIELDS.includes(field as any)) {
    return amount > maxBetValues.corner;
  }
  return amount > maxBetValues.half;
}
