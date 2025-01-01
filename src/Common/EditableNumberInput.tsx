import React, { useState, useEffect } from "react";

interface EditableNumberInputProps {
  id: string;
  value: number;
  placeholder: string;
  onUpdate: (id: string, key: string, value: unknown) => void;
  keyName: string;
}

const EditableNumberInput: React.FC<EditableNumberInputProps> = ({
  id,
  value,
  placeholder,
  onUpdate,
  keyName,
}) => {
  const [tempValue, setTempValue] = useState<number | string>(value);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempValue(newValue);

    // If there's a timeout already set, clear it
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for 3 seconds after the user stops typing
    const newTimeout = setTimeout(() => {
      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue)) {
        onUpdate(id, keyName, parsedValue); // Notify parent with the updated value
      }
    }, 3000); // 3 seconds debounce time

    // Save the timeout so we can clear it on the next change
    setDebounceTimeout(newTimeout);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newValue = parseFloat(tempValue.toString());
      if (!isNaN(newValue)) {
        onUpdate(id, keyName, newValue); // Notify parent to update immediately
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <input
        type="number"
        className="form-control"
        style={{ minWidth: 100 }}
        placeholder={placeholder}
        value={tempValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default EditableNumberInput;
