import React, { useState } from "react";
import NewItemForm from "../NewItemForm";

import * as S from "./styles";

type AddNewItemProps = {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
};

const AddNewItem = ({ onAdd, toggleButtonText, dark }: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <S.AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </S.AddItemButton>
  );
};

export default AddNewItem;
