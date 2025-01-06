import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl } from '@mui/material';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2';

export default function PhoneNumberInput({
    name,
    control,
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
                    <>
                        <PhoneInput
                            {...field}
                            international
                            country={'in'}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            placeholder={placeholder}

                        />

                    </>
                )}
            />
            {errors?.[name] && (
                <p style={{ color: '#c22626', marginTop: '8px', fontSize: '0.875rem' }}>
                    {errors[name]?.message}
                </p>
            )}
        </FormControl>
    );
}
