import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function PhoneNumberInput({
    name,
    control,
    label,
    errors,
    validation,
    className,
    placeholder,
}) {
    return (
        <FormControl fullWidth className={className}>
            <Controller

                name={name}
                control={control}
                defaultValue=""
                rules={validation}
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
