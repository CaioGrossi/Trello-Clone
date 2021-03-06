import React, { useRef } from "react";
import { useAppState } from "../../context/AppStateContext";
import useItemDrag from "../../hooks/useItemDrag";
import { useDrop } from "react-dnd";
import { DragItem } from "../../types/DragItem";
import isHidden from "../../utils/isHidden";

import Card from "../Card";
import AddNewItem from "../AddNewItem";

import * as S from "./styles";

type ColumnProps = {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
};

const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN") {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });

        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumn = item.columnId;
        const targetColumn = id;

        if (sourceColumn === targetColumn) {
          return;
        }

        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        });

        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });

  drag(drop(ref));

  return (
    <S.ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    >
      <S.ColumnTitle>{text}</S.ColumnTitle>
      {state.lists[index].tasks.map((task, index) => (
        <Card
          id={task.id}
          columnId={id}
          text={task.text}
          key={task.id}
          index={index}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: "ADD_TASK", payload: { text, listId: id } })
        }
        dark
      />
    </S.ColumnContainer>
  );
};

export default Column;
