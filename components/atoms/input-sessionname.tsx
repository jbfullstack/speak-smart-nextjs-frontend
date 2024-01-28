import React from "react";
import {Input} from "@nextui-org/react";

const InputSessionname = () => {
  const [value, setValue] = React.useState('');
  const placement = 'outside';

  return (
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
              isRequired
              key={placement}
              label="Session name"
              labelPlacement={placement}
              value={value}
              onValueChange={setValue}
              description='Name of the chat session'
            />
        </div>
  );
}

export default InputSessionname;

