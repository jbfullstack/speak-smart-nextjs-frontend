import React from "react";
import {Input} from "@nextui-org/react";

const InputUsername = ({username}) => {
  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Input
        isReadOnly
        key="outside"
        label="User name"
        value={username}
      />
    </div>
  );
}

export default InputUsername;
