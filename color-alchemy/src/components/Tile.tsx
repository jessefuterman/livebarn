import styled from "styled-components";
import { type RGBColor, toRgb } from "../utils/color";

interface TileProps {
  color: RGBColor;
  isClosest?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

const StyledTile = styled.div<{ $isClosest: boolean; $draggable: boolean }>`
  width: 32px;
  height: 32px;
  border: 2px solid ${({ $isClosest }) => ($isClosest ? "red" : "transparent")};
  cursor: ${({ $draggable }) => ($draggable ? "grab" : "default")};
  box-sizing: border-box;
`;

const Tile = ({
  color,
  isClosest = false,
  draggable = false,
  onDragStart,
}: TileProps) => {
  const cssColor = toRgb(color);

  const handleDragStart = (e: React.DragEvent) => {
    const ghost = document.createElement("div");
    ghost.style.width = "32px";
    ghost.style.height = "32px";
    ghost.style.backgroundColor = cssColor;
    ghost.style.position = "absolute";
    ghost.style.top = "-1000px";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    setTimeout(() => document.body.removeChild(ghost), 0);
    onDragStart?.(e);
  };

  return (
    <StyledTile
      title={cssColor}
      style={{ backgroundColor: cssColor }}
      $isClosest={isClosest}
      $draggable={draggable}
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
    />
  );
};

export default Tile;
