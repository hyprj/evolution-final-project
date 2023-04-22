import {
  CornerField,
  Field,
  Multiplier,
  NonNumericField,
  NumericField,
  SplitField,
  StreetField,
  LineField,
  TextVisibleField,
} from "./types";

export const NUMERIC_FIELDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
] as const;

export const RED_NUMBERS = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
] as const;

export const NUMERIC_MULTIPLIER = 35;

export const TEXT_VISIBLE_FIELDS = [
  "odd",
  "even",
  "red",
  "black",
  "1-18",
  "19-36",
  "1st12",
  "2nd12",
  "3rd12",
  "3-36",
  "2-35",
  "1-34",
] as const;

export const HUD_VISIBLE_BET_VALUES = [
  ...NUMERIC_FIELDS,
  ...TEXT_VISIBLE_FIELDS,
];

export const SPLIT_FIELDS = [
  "split_1-2",
  "split_2-3",
  "split_4-5",
  "split_5-6",
  "split_7-8",
  "split_8-9",
  "split_10-11",
  "split_11-12",
  "split_13-14",
  "split_14-15",
  "split_16-17",
  "split_17-18",
  "split_19-20",
  "split_20-21",
  "split_22-23",
  "split_23-24",
  "split_25-26",
  "split_26-27",
  "split_28-29",
  "split_29-30",
  "split_31-32",
  "split_32-33",
  "split_34-35",
  "split_35-36",
  "split_1-4",
  "split_2-5",
  "split_3-6",
  "split_4-7",
  "split_5-8",
  "split_6-9",
  "split_7-10",
  "split_8-11",
  "split_9-12",
  "split_10-13",
  "split_11-14",
  "split_12-15",
  "split_13-16",
  "split_14-17",
  "split_15-18",
  "split_16-19",
  "split_17-20",
  "split_18-21",
  "split_19-22",
  "split_20-23",
  "split_21-24",
  "split_22-25",
  "split_23-26",
  "split_24-27",
  "split_25-28",
  "split_26-29",
  "split_27-30",
  "split_28-31",
  "split_29-32",
  "split_30-33",
  "split_31-34",
  "split_32-35",
  "split_33-36",
] as const;

export const CORNER_FIELDS = [
  "corner_1-5",
  "corner_2-6",
  "corner_4-8",
  "corner_5-9",
  "corner_7-11",
  "corner_8-12",
  "corner_10-14",
  "corner_11-15",
  "corner_13-17",
  "corner_14-18",
  "corner_16-20",
  "corner_17-21",
  "corner_19-23",
  "corner_20-24",
  "corner_22-25",
  "corner_23-27",
  "corner_25-29",
  "corner_26-30",
  "corner_28-32",
  "corner_29-33",
  "corner_31-35",
  "corner_32-36",
] as const;

export const STREET_FIELDS = [
  "street_1-3",
  "street_4-6",
  "street_7-9",
  "street_10-12",
  "street_13-15",
  "street_16-18",
  "street_19-21",
  "street_22-24",
  "street_25-27",
  "street_28-30",
  "street_31-33",
  "street_34-36",
] as const;

export const LINE_FIELDS = [
  "line_1-6",
  "line_4-9",
  "line_7-12",
  "line_10-15",
  "line_13-18",
  "line_16-21",
  "line_19-24",
  "line_22-27",
  "line_25-30",
  "line_28-33",
  "line_31-36",
] as const;

export const lineFieldNumbers: Record<LineField, NumericField[]> = {
  "line_1-6": [1, 2, 3, 4, 5, 6],
  "line_4-9": [4, 5, 6, 7, 8, 9],
  "line_7-12": [7, 8, 9, 10, 11, 12],
  "line_10-15": [10, 11, 12, 13, 14, 15],
  "line_13-18": [13, 14, 15, 16, 17, 18],
  "line_16-21": [16, 17, 18, 19, 20, 21],
  "line_19-24": [19, 20, 21, 22, 23, 24],
  "line_22-27": [22, 23, 24, 25, 26, 27],
  "line_25-30": [25, 26, 27, 28, 29, 30],
  "line_28-33": [28, 29, 30, 31, 32, 33],
  "line_31-36": [31, 32, 33, 34, 35, 36],
};

export const streetFieldNumbers: Record<StreetField, NumericField[]> = {
  "street_1-3": [1, 2, 3],
  "street_4-6": [4, 5, 6],
  "street_7-9": [7, 8, 9],
  "street_10-12": [10, 11, 12],
  "street_13-15": [13, 14, 15],
  "street_16-18": [16, 17, 18],
  "street_19-21": [19, 20, 21],
  "street_22-24": [22, 23, 24],
  "street_25-27": [25, 26, 27],
  "street_28-30": [28, 29, 30],
  "street_31-33": [31, 32, 33],
  "street_34-36": [34, 35, 36],
};

export const cornerFieldNumbers: Record<CornerField, NumericField[]> = {
  "corner_1-5": [1, 2, 4, 5],
  "corner_2-6": [2, 3, 5, 6],
  "corner_4-8": [4, 5, 7, 8],
  "corner_5-9": [5, 6, 8, 9],
  "corner_7-11": [7, 8, 10, 11],
  "corner_8-12": [8, 9, 11, 12],
  "corner_10-14": [10, 11, 13, 14],
  "corner_11-15": [11, 12, 14, 15],
  "corner_13-17": [13, 14, 16, 17],
  "corner_14-18": [14, 15, 17, 18],
  "corner_16-20": [16, 17, 19, 20],
  "corner_17-21": [17, 18, 20, 21],
  "corner_19-23": [19, 20, 22, 23],
  "corner_20-24": [20, 21, 23, 24],
  "corner_22-25": [22, 23, 25, 26],
  "corner_23-27": [23, 24, 26, 27],
  "corner_25-29": [25, 26, 28, 29],
  "corner_26-30": [26, 27, 29, 30],
  "corner_28-32": [28, 29, 31, 32],
  "corner_29-33": [29, 30, 32, 33],
  "corner_31-35": [31, 32, 34, 35],
  "corner_32-36": [32, 33, 35, 36],
};

export const textFieldNumbers: Record<TextVisibleField, NumericField[]> = {
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

export const splitFieldsNumbers: Record<SplitField, NumericField[]> = {
  "split_1-2": [1, 2],
  "split_2-3": [2, 3],
  "split_4-5": [4, 5],
  "split_5-6": [5, 6],
  "split_7-8": [7, 8],
  "split_8-9": [8, 9],
  "split_10-11": [10, 11],
  "split_11-12": [11, 12],
  "split_13-14": [13, 14],
  "split_14-15": [14, 15],
  "split_16-17": [16, 17],
  "split_17-18": [17, 18],
  "split_19-20": [19, 20],
  "split_20-21": [20, 21],
  "split_22-23": [22, 23],
  "split_23-24": [23, 24],
  "split_25-26": [25, 26],
  "split_26-27": [26, 27],
  "split_28-29": [28, 29],
  "split_29-30": [29, 30],
  "split_31-32": [31, 32],
  "split_32-33": [32, 33],
  "split_34-35": [34, 35],
  "split_35-36": [35, 36],
  "split_1-4": [1, 4],
  "split_2-5": [2, 5],
  "split_3-6": [3, 6],
  "split_4-7": [4, 7],
  "split_5-8": [5, 8],
  "split_6-9": [6, 9],
  "split_7-10": [7, 10],
  "split_8-11": [8, 11],
  "split_9-12": [9, 12],
  "split_10-13": [10, 13],
  "split_11-14": [11, 14],
  "split_12-15": [12, 15],
  "split_13-16": [13, 16],
  "split_14-17": [14, 17],
  "split_15-18": [15, 18],
  "split_16-19": [16, 19],
  "split_17-20": [17, 20],
  "split_18-21": [18, 21],
  "split_19-22": [19, 22],
  "split_20-23": [20, 23],
  "split_21-24": [21, 24],
  "split_22-25": [22, 25],
  "split_23-26": [23, 26],
  "split_24-27": [24, 27],
  "split_25-28": [25, 28],
  "split_26-29": [26, 29],
  "split_27-30": [27, 30],
  "split_28-31": [28, 31],
  "split_29-32": [29, 32],
  "split_30-33": [30, 33],
  "split_31-34": [31, 34],
  "split_32-35": [32, 35],
  "split_33-36": [33, 36],
};

export const nonNumericFieldNumbers: Record<NonNumericField, Field[]> = {
  ...textFieldNumbers,
  ...splitFieldsNumbers,
  ...cornerFieldNumbers,
  ...streetFieldNumbers,
  ...lineFieldNumbers,
};

export const NOT_VISIBLE_FIELDS = [
  ...SPLIT_FIELDS,
  ...CORNER_FIELDS,
  ...STREET_FIELDS,
  ...LINE_FIELDS,
] as const;

export type FieldMultiplierType =
  | "corner"
  | "line"
  | "street"
  | "split"
  | "parity"
  | "color"
  | "row"
  | "twelve"
  | "numeric"
  | "half";

export const multipliers: Record<FieldMultiplierType, Multiplier> = {
  corner: 8,
  line: 5,
  street: 11,
  split: 17,
  parity: 1,
  color: 1,
  row: 2,
  twelve: 2,
  numeric: 35,
  half: 1,
};

const COLOR_FIELDS = ["black", "red"] as const;
const PARITY_FIELDS = ["odd", "even"] as const;
const ROW_FIELDS = ["1-34", "2-35", "3-36"] as const;
const TWELVE_FIELDS = ["1st12", "2nd12", "3rd12"] as const;

export function getMultiplierBetter(field: Field): Multiplier {
  if (NUMERIC_FIELDS.includes(field as any)) {
    return multipliers.numeric;
  }
  if (COLOR_FIELDS.includes(field as any)) {
    return multipliers.color;
  }
  if (PARITY_FIELDS.includes(field as any)) {
    return multipliers.parity;
  }
  if (ROW_FIELDS.includes(field as any)) {
    return multipliers.row;
  }
  if (TWELVE_FIELDS.includes(field as any)) {
    return multipliers.twelve;
  }
  if (SPLIT_FIELDS.includes(field as any)) {
    return multipliers.split;
  }
  if (STREET_FIELDS.includes(field as any)) {
    return multipliers.street;
  }
  if (LINE_FIELDS.includes(field as any)) {
    return multipliers.line;
  }
  if (CORNER_FIELDS.includes(field as any)) {
    return multipliers.corner;
  }
  return multipliers.half;
}

export const FIELDS = [
  ...NUMERIC_FIELDS,
  ...TEXT_VISIBLE_FIELDS,
  ...SPLIT_FIELDS,
  ...CORNER_FIELDS,
  ...STREET_FIELDS,
  ...LINE_FIELDS,
] as const;

export const CHIPS = [1, 5, 10, 50, 100] as const;
