import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function FormInput({
    name,
    control,
    label,
    errors,
    inputType,
    className,
    placeholder,
    validation, // Accept validation rules as a prop
}) {
    return (

        <FormControl fullWidth className={className}>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={validation} // Apply validation rules
                render={({ field }) => (
                    <TextField
                        {...field}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!errors?.[name]} // Highlight field if validation error exists
                        helperText={errors?.[name]?.message} // Display validation error message
                        label={label}
                        placeholder={placeholder}
                        type={inputType}
                        variant="outlined"
                    />
                )}
            />
        </FormControl>
    );
}
