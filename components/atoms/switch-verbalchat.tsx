import { Switch } from "@nextui-org/react";
import React from "react";

const SwitchVerbalChat = () => {
  const [value, setValue] = React.useState(true);

  return (
    <Switch
      defaultSelected
      onValueChange={setValue}
      // startContent={<SunIcon />}
      // endContent={<MoonIcon />}
    >
      {value ? "spoken" : "written"}
    </Switch>
  );
};

export default SwitchVerbalChat;
