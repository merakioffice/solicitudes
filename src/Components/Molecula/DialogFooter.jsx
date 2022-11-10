import React from "react";
import BtnDialogCheck from "../Atomo/BtnDialogCheck";
import BtnDialogTimes from "../Atomo/BtnDialogTimes";
export default function DialogFooter({ OnClickTimes, OnClickCheck }) {
  return ( 
    <>
      <BtnDialogTimes OnClickTimes={OnClickTimes} />
      <BtnDialogCheck OnClickCheck={OnClickCheck} />
    </>
  );
}
