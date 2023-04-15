interface Field {
  value: string | number;
  gridArea: string;
  bgColor?: "field-red" | "field-green" | "field-black" | "field-gray";
}

export function BoardItemView({ field }: { field: Field }) {
  return (
    <div
      className={`board-field ${field.bgColor}`}
      style={{ gridArea: field.gridArea }}
    >
      {field.value}
    </div>
  );
}

export function BoardBettingItem({ field }: { field: Field }) {
  return (
    <div data-value={field.value} style={{ gridArea: field.gridArea }}></div>
  );
}
