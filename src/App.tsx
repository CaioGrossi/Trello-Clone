import React from "react";
import Column from "./components/Column";
import AppContainer from "./components/Container";
import AddNewItem from "./components/AddNewItem";
import { useAppState } from "./context/AppStateContext";
import CustomDragLayer from "./components/CustomDragLayer";

function App() {
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, index) => (
        <Column id={list.id} text={list.text} key={list.id} index={index} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add Another List"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  );
}

export default App;
