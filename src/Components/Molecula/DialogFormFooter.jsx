import React from "react";
import BtnDialogFormCheck from "../Atomo/BtnDialogFormCheck";
import BtnDialogFormTimes from "../Atomo/BtnDialogFormTimes";

export default function DialogFormFooter({
  OnClickTimes,
  OnClickCheck,

}) {
  return (
    <>
      <BtnDialogFormTimes
        OnClickTimes={OnClickTimes}

      />
      <BtnDialogFormCheck
        OnClickCheck={OnClickCheck}

      />
    </>
  );
}
