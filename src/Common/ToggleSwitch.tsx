import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  ...props
}) => {
  return (
    <div className="form-check form-switch custom-switch-v1 mx-2">
      <input
        className={"form-check-input"}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default ToggleSwitch;
