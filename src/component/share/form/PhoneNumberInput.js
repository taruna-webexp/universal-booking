import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function PhoneNumberInput({
    name,
    control,
    label,
    errors,
    validation, // Accept validation rules as a prop
    className,
    placeholder,
}) {
    return (
        <FormControl fullWidth className={className}>
            <Controller

                name={name}
                control={control}
                defaultValue=""
                rules={validation} // Apply validation rules
                render={({ field }) => (
                    <PhoneInput
                        {...field}
                        international
                        defaultCountry="IN"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        placeholder={placeholder}
                    />
                )}
            />
            {errors?.[name] && <p style={{ color: "#c22626" }}>{errors[name]?.message}</p>}
        </FormControl>
    );
}
