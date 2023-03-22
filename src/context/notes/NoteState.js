import React, { useState } from "react";
import NoteContext from "./noteContext";

//In this file we are creating states which we wanted down the tree in any component without pasing props again and again

const NoteState = (props) => {
  const s1 = {
    name: "Ajju",
    rollnum: "5",
  };
  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "anand",
        rollnum: "10",
      });
    }, 3000);
  };

  return (
    //props.children are wrapped inside & value is passed as above state
    //{<-Javascript {<- object ->} ->}

    //instead of writing like this ->  {{state: state, update: update}}
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
