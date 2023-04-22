import {
  NUMERIC_FIELDS,
  CHIPS,
  FIELDS,
  SPLIT_FIELDS,
  STREET_FIELDS,
  CORNER_FIELDS,
  LINE_FIELDS,
  TEXT_VISIBLE_FIELDS,
} from "./consts";

export type TextVisibleField = (typeof TEXT_VISIBLE_FIELDS)[number];

export type SplitField = (typeof SPLIT_FIELDS)[number];

export type CornerField = (typeof CORNER_FIELDS)[number];

export type NumericField = (typeof NUMERIC_FIELDS)[number];

export type StreetField = (typeof STREET_FIELDS)[number];

export type NonNumericField = Exclude<Field, number>;

export type LineField = (typeof LINE_FIELDS)[number];

export type Field = (typeof FIELDS)[number];

export type Chip = (typeof CHIPS)[number];

export type Multiplier = 1 | 2 | 3 | 5 | 8 | 11 | 17 | 35;

export interface Bet {
  amount: number;
  field: Field;
  chips: Chip[];
}
