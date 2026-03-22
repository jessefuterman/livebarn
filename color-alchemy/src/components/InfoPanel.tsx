import styled from "styled-components";
import Tile from "./Tile";
import { type RGBColor } from "../utils/color";

interface InfoPanelProps {
  userId: string;
  movesLeft: number;
  target: RGBColor;
  closestColor: RGBColor;
  closestDiff: number;
}

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoPanel = ({
  userId,
  movesLeft,
  target,
  closestColor,
  closestDiff,
}: InfoPanelProps) => {
  const diffPercent = (closestDiff * 100).toFixed(2);

  return (
    <Panel>
      <InfoItem>
        <Label>User ID</Label>
        <Value>{userId}</Value>
      </InfoItem>

      <InfoItem>
        <Label>Moves Left</Label>
        <Value>{movesLeft}</Value>
      </InfoItem>

      <InfoItem>
        <Label>Target Color</Label>
        <Value>
          <Tile color={target} />
        </Value>
      </InfoItem>

      <InfoItem>
        <Label>Closest Color</Label>
        <Value>
          <Tile color={closestColor} />
          Δ={diffPercent}%
        </Value>
      </InfoItem>
    </Panel>
  );
};

export default InfoPanel;
