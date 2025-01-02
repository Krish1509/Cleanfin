/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  value: Date | string; // Can accept either Date or ISO string format
  onChange?: (date: Date | null) => void; // Optional callback function to notify parent of date change
  disabled?: boolean; // Optional prop to disable the picker
  dateFormat?: string; // Optional format for date display (default: "yyyy-MM-dd")
  className?: string; // Optional additional CSS classes
  minDate?: Date; // Optional minimum date
  maxDate?: Date; // Optional miximum date
};

const DatePicker: React.FC<DatePickerProps | any> = ({
  value,
  onChange,
  disabled = false,
  dateFormat = "yyyy-MM-dd",
  className = "",
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sync internal state with prop value
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  // Internal handler for date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Update the internal state
    if (onChange) {
      onChange(date); // Notify parent via onChange callback if provided
    }
  };

  return (
    <ReactDatePicker
      className={`form-control ${className}`}
      selected={selectedDate}
      onChange={handleDateChange}
      disabled={disabled}
      dateFormat={dateFormat}
      {...props}
    />
  );
};

export default DatePicker;
