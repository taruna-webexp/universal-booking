import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
    name,
    control,
    label,
    options,
    errors,
    defaultValue,
    validation,
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue || ""}
                rules={validation} // Apply validation rules
                render={({ field }) => (
                    <Select
                        label={label}
                        id={name}
                        {...field}
                        className="shadow-lg"
                        error={!!errors?.[name]} // Highlight field if validation error exists
                        helperText={errors?.[name]?.message} // Display validation error message
                    >
                        {options?.map((option) => (
                            <MenuItem
                                className="capitalize"
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />

            {errors?.[name] && (
                <p style={{ color: "#c22626" }}>{errors[name]?.message}</p>

            )}
        </FormControl>
    );
};

export default FormInputSelect;
