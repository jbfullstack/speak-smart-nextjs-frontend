import { Input } from "@nextui-org/react";

// Add props definition to accept value and onValueChange from the parent
const InputSessionname = ({ value, onValueChange }) => {
  const placement = "outside";

  // Use the value and onValueChange props directly in the Input component
  // Ensure that the Input component uses onChange to handle changes, not onValueChange,
  // unless it specifically supports onValueChange
  return (
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        isRequired
        key={placement}
        label="Session name"
        labelPlacement={placement}
        value={value}
        onChange={(e) => onValueChange(e.target.value)} // Adjusted to use standard onChange event
        description="Name of the chat session"
      />
    </div>
  );
};

export default InputSessionname;
