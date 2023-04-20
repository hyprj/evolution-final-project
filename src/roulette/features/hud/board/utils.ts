import { RED_NUMBERS, TEXT_BET_VALUES } from "../../../utils/consts";
import { TextBetValue, BetValue } from "../../../utils/types";

export interface TextValueView {
  name: string;
  area: string;
}

export const textValuesInfo: Record<TextBetValue, TextValueView> = {
  "3-36": { name: "2 - 1", area: "1/53/5/57" },
  "2-35": { name: "2 - 1", area: "5/53/9/57" },
  "1-34": { name: "2 - 1", area: "9/53/13/57" },
  "1st12": { name: "1st 12", area: "13/5/16/21" },
  "2nd12": { name: "2nd 12", area: "13/21/16/37" },
  "3rd12": { name: "3rd 12", area: "13/37/16/53" },
  "1-18": { name: "1 - 18", area: "16/5/19/13" },
  even: { name: "even", area: "16/13/19/21" },
  red: { name: "red", area: "16/21/19/29" },
  black: { name: "black", area: "16/29/19/37" },
  odd: { name: "odd", area: "16/37/19/45" },
  "19-36": { name: "19 - 36", area: "16/45/19/53" },
};

/**
 *
 * @param area gridArea shorthand property x/y/z/u
 * @returns gridArea with swapped columns with rows
 */

export function reverseGridArea(area: string) {
  const areas = area.split("/");
  return `${areas[1]}/${areas[0]}/${areas[3]}/${areas[2]}`;
}

/**
 * @param number numeric field of a roulette's wheel
 * @return gridArea value based on assumption that each board field is split into 4x4 subcells
 */
export function getGridAreaByValue(value: BetValue, isPortrait: boolean) {
  let area: string;

  if (typeof value === "string") {
    area = textValuesInfo[value].area;
  } else if (value === 0) {
    area = "1/1/13/5";
  } else {
    const colStart = Math.ceil(value / 3) * 4 + 1;
    const colEnd = colStart + 4;

    const remainder = value % 3;
    const rowValues = { 0: 1, 2: 5, 1: 9 };
    const rowStart = rowValues[remainder as 0 | 1 | 2];
    const rowEnd = rowStart + 4;
    area = `${rowStart}/${colStart}/${rowEnd}/${colEnd}`;
  }
  return isPortrait ? reverseGridArea(area) : area;
}

export function getBgColorByValue(value: BetValue) {
  if (value === 0) return "green-field";
  if (RED_NUMBERS.includes(value as any)) {
    return "red-field";
  }

  if (TEXT_BET_VALUES.includes(value as TextBetValue)) {
    return "green-field";
  }

  return "black-field";
}

export const getFieldName = (value: BetValue) =>
  typeof value === "number" ? value : textValuesInfo[value].name;
