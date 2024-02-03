import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";

const Selector = ({
  options,
  displayMessage,
  defaultValue,
  selectionChanged, // This prop is now optional
}) => {
  // Initialize selectedKeys with defaultValue
  const [selectedKeys, setSelectedKeys] = useState(new Set([defaultValue]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const changeValue = (keys) => {
    console.log("keys", keys);
    setSelectedKeys(keys);
    // Only call selectionChanged if it's a function
    if (typeof selectionChanged === "function") {
      selectionChanged(Array.from(keys)[0]);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {displayMessage} {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color="primary"
        aria-label="Selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => changeValue(new Set(keys))}
      >
        {options.map((option) => (
          <DropdownItem key={option}>{option}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Selector;
