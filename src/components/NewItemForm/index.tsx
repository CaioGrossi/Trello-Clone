import React, { useState } from "react";
import useFocus from "../../hooks/useFocus";

import * as S from "./styles";

type NewItemFormProps = {
  onAdd(text: string): void;
};

const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  return (
    <S.NewItemFormContainer>
      <S.NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <S.NewItemButton onClick={() => onAdd(text)}>Create</S.NewItemButton>
    </S.NewItemFormContainer>
  );
};

export default NewItemForm;
