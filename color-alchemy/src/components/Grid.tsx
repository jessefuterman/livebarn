import styled from "styled-components";
import Tile from "./Tile";
import Source from "./Source";
import { type RGBColor, type Sources } from "../utils/color";
import { type SourcePosition } from "../types";

interface GridProps {
  width: number;
  height: number;
  tiles: RGBColor[][];
  sources: Sources;
  closestTile: [number, number] | null;
  canClickSources: boolean;
  canDragTiles: boolean;
  onSourceClick: (position: SourcePosition, index: number) => void;
  onTileDragStart: (row: number, col: number) => void;
  onSourceDrop: (position: SourcePosition, index: number) => void;
}

const StyledGrid = styled.div<{ $cols: number; $rows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 32px);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 32px);
  gap: 4px;
`;

const EmptyCell = styled.div`
  width: 32px;
  height: 32px;
`;

const Grid = ({
  width,
  height,
  tiles,
  sources,
  closestTile,
  canClickSources,
  canDragTiles,
  onSourceClick,
  onTileDragStart,
  onSourceDrop,
}: GridProps) => {
  const cells: React.ReactNode[] = [];

  for (let row = 0; row <= height + 1; row++) {
    for (let col = 0; col <= width + 1; col++) {
      const isTopEdge = row === 0;
      const isBottomEdge = row === height + 1;
      const isLeftEdge = col === 0;
      const isRightEdge = col === width + 1;

      const isCorner =
        (isTopEdge || isBottomEdge) && (isLeftEdge || isRightEdge);
      const key = `${row}-${col}`;

      if (isCorner) {
        cells.push(<EmptyCell key={key} />);
        continue;
      }

      if (isTopEdge) {
        const index = col - 1;
        cells.push(
          <Source
            key={key}
            color={sources.top[index]}
            isClickable={canClickSources}
            isDroppable={!canClickSources}
            onClick={() => onSourceClick("top", index)}
            onDrop={() => onSourceDrop("top", index)}
          />,
        );
        continue;
      }

      if (isBottomEdge) {
        const index = col - 1;
        cells.push(
          <Source
            key={key}
            color={sources.bottom[index]}
            isClickable={canClickSources}
            isDroppable={!canClickSources}
            onClick={() => onSourceClick("bottom", index)}
            onDrop={() => onSourceDrop("bottom", index)}
          />,
        );
        continue;
      }

      if (isLeftEdge) {
        const index = row - 1;
        cells.push(
          <Source
            key={key}
            color={sources.left[index]}
            isClickable={canClickSources}
            isDroppable={!canClickSources}
            onClick={() => onSourceClick("left", index)}
            onDrop={() => onSourceDrop("left", index)}
          />,
        );
        continue;
      }

      if (isRightEdge) {
        const index = row - 1;
        cells.push(
          <Source
            key={key}
            color={sources.right[index]}
            isClickable={canClickSources}
            isDroppable={!canClickSources}
            onClick={() => onSourceClick("right", index)}
            onDrop={() => onSourceDrop("right", index)}
          />,
        );
        continue;
      }

      const tileRow = row - 1;
      const tileCol = col - 1;
      const isClosest =
        closestTile?.[0] === tileRow && closestTile?.[1] === tileCol;

      cells.push(
        <Tile
          key={key}
          color={tiles[tileRow][tileCol]}
          isClosest={isClosest}
          draggable={canDragTiles}
          onDragStart={() => onTileDragStart(tileRow, tileCol)}
        />,
      );
    }
  }

  return (
    <StyledGrid $cols={width + 2} $rows={height + 2}>
      {cells}
    </StyledGrid>
  );
};

export default Grid;
