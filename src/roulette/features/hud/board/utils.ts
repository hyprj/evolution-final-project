import { RED_NUMBERS, TEXT_VISIBLE_FIELDS } from "@roulette/utils/consts";
import { Chip, Field, TextVisibleField } from "@roulette/utils/types";

export const visibleFieldsName: Record<TextVisibleField, string> = {
  "3-36": "2 - 1",
  "2-35": "2 - 1",
  "1-34": "2 - 1",
  "1st12": "1st 12",
  "2nd12": "2nd 12",
  "3rd12": "3rd 12",
  "1-18": "1 - 18",
  even: "even",
  red: "red",
  black: "black",
  odd: "odd",
  "19-36": "19 - 36",
};

export function getBgColorByField(field: Field) {
  if (field === 0) return "green-field";
  if (RED_NUMBERS.includes(field as any)) {
    return "red-field";
  }

  if (TEXT_VISIBLE_FIELDS.includes(field as TextVisibleField)) {
    return "green-field";
  }

  return "black-field";
}

export const getFieldName = (field: Field) =>
  typeof field === "number"
    ? field
    : visibleFieldsName[field as TextVisibleField];

export function getChipIconByBetValue(betValue: number): Chip {
  if (betValue >= 100) {
    return 100;
  }
  if (betValue >= 50) {
    return 50;
  }
  if (betValue >= 10) {
    return 10;
  } else if (betValue >= 5) {
    return 5;
  }
  return 1;
}

export function chipValueToString(value: number) {
  if (value < 1000) return value;
  return (value / 100 / 10).toFixed(2) + "k";
}
