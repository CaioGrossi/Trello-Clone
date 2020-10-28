import React from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import Column from "../Column";
import Card from "../Card";

import * as S from "./styles";

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  } else {
    return (
      <S.CustomDragLayerContainer>
        <div style={getItemStyles(currentOffset)}>
          {item.type === "COLUMN" ? (
            <Column
              id={item.id}
              text={item.text}
              index={item.index}
              isPreview={true}
            />
          ) : (
            <Card
              columnId={item.columnId}
              isPreview={true}
              index={0}
              id={item.id}
              text={item.text}
            />
          )}
        </div>
      </S.CustomDragLayerContainer>
    );
  }
};

export default CustomDragLayer;
