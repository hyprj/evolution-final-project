import { BoardItem } from "./BoardItem";

export function BoardHUD() {
  const normalNumbers = new Array(36).fill(null);
  return (
    <div className="absolute bottom-5 right-5  grid h-56 w-96 select-none grid-cols-14 grid-rows-5 gap-1 text-white">
      <BoardItem
        text="0"
        bgRounded="full"
        colStart={1}
        colEnd={2}
        rowStart={1}
        rowEnd={4}
      />
      {normalNumbers.map((_, i) => {
        const num = i + 1;
        const col = Math.ceil(num / 3);
        const row = num % 3 === 0 ? 0 : num % 3 === 2 ? 1 : 2;
        return (
          <BoardItem
            key={i}
            text={num}
            bgRounded="full"
            bgColor={num % 2 === 0 ? "red" : "black"}
            colStart={col + 1}
            colEnd={col + 2}
            rowStart={row + 1}
            rowEnd={row + 2}
          />
        );
      })}
      <BoardItem
        text="2to1"
        bgRounded="full"
        colStart={14}
        colEnd={15}
        rowStart={1}
        rowEnd={2}
        rotate={true}
      />
      <BoardItem
        text="2to1"
        bgRounded="full"
        colStart={14}
        colEnd={15}
        rowStart={2}
        rowEnd={3}
        rotate={true}
      />
      <BoardItem
        text="2to1"
        bgRounded="full"
        colStart={14}
        colEnd={15}
        rowStart={3}
        rowEnd={4}
        rotate={true}
      />
      <BoardItem
        text="1st12"
        bgColor="black"
        bgRounded="full"
        colStart={2}
        colEnd={6}
        rowStart={4}
        rowEnd={5}
      />
      <BoardItem
        text="2nd12"
        bgRounded="full"
        colStart={6}
        colEnd={10}
        rowStart={4}
        rowEnd={5}
      />
      <BoardItem
        text="3rd12"
        bgRounded="full"
        colStart={10}
        colEnd={14}
        rowStart={4}
        rowEnd={5}
      />
      <BoardItem
        text="1to18"
        bgRounded="full"
        colStart={2}
        colEnd={4}
        rowStart={5}
        rowEnd={6}
      />
      <BoardItem
        text="even"
        bgRounded="full"
        colStart={4}
        colEnd={6}
        rowStart={5}
        rowEnd={6}
      />
      <BoardItem
        text="red"
        bgRounded="full"
        colStart={6}
        colEnd={8}
        rowStart={5}
        rowEnd={6}
      />
      <BoardItem
        text="black"
        bgRounded="full"
        colStart={8}
        colEnd={10}
        rowStart={5}
        rowEnd={6}
      />
      <BoardItem
        text="odd"
        bgRounded="full"
        colStart={10}
        colEnd={12}
        rowStart={5}
        rowEnd={6}
      />
      <BoardItem
        text="19to36"
        bgRounded="full"
        colStart={12}
        colEnd={14}
        rowStart={5}
        rowEnd={6}
      />
    </div>
  );
}
