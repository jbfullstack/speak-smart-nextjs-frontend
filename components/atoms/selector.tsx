import React, { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";

const Selector = ({ options, displayMessage, defaultValue }) => {
    // Initialize selectedKeys with defaultValue
    const [selectedKeys, setSelectedKeys] = useState(new Set([defaultValue]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button 
                    variant="bordered" 
                    className="capitalize"
                >
                    {displayMessage} {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu 
                color='primary'
                aria-label="Selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(new Set(keys))}
            >
                {options.map(option => (
                    <DropdownItem key={option}>{option}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default Selector;
