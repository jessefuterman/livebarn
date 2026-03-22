import styled from "styled-components";
import { type RGBColor, toRgb } from "../utils/color";

interface SourceProps {
  color: RGBColor;
  isClickable?: boolean;
  isDroppable?: boolean;
  onClick?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
}

const StyledSource = styled.div<{ $interactive: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: ${({ $interactive }) => ($interactive ? "pointer" : "default")};
  box-sizing: border-box;
`;

const Source = ({
  color,
  isClickable = false,
  isDroppable = false,
  onClick,
  onDrop,
  onDragOver,
}: SourceProps) => {
  const cssColor = toRgb(color);
  const isInteractive = isClickable || isDroppable;

  const handleDragOver = (e: React.DragEvent) => {
    if (isDroppable) {
      e.preventDefault();
      onDragOver?.(e);
    }
  };

  return (
    <StyledSource
      title={cssColor}
      style={{ backgroundColor: cssColor }}
      $interactive={isInteractive}
      onClick={isClickable ? onClick : undefined}
      onDrop={isDroppable ? onDrop : undefined}
      onDragOver={handleDragOver}
    />
  );
};

export default Source;
