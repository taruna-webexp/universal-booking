import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormInput from "../share/form/FormInput";
import FormInputSelect from "../share/form/SelectInput";

const DynamicFormInput = ({ control, field, errors }) => {
    const {
        type,
        name,
        placeholder,
        defaultValue,
        class: fieldClass,
        required,
        options,
    } = field;

    // Generate validation rules
    const validation = required
        ? { required: `${placeholder || name} is required` }
        : {};

    switch (type) {
        case "text":
        case "number":
            return (
                <FormInput
                    control={control}
                    name={name}
                    inputType={type}
                    label={placeholder}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    errors={errors}
                    className={fieldClass}
                    validation={validation} // Pass validation rules
                />
            );

        case "select":
            return (
                <FormInputSelect
                    name={name}
                    control={control}
                    label={placeholder}
                    defaultValue={defaultValue}
                    errors={errors}
                    className={fieldClass}
                    options={options}
                    placeholder={placeholder}
                    validation={validation} // Pass validation rules
                />
            );

        case "checkbox":
            return (
                <Controller
                    name={name}
                    control={control}
                    rules={validation} // Pass validation rules
                    defaultValue={defaultValue || false}
                    render={({ field: controllerField }) => (
                        <div className={fieldClass}>
                            <Checkbox {...controllerField} />
                            <label>{placeholder}</label>
                            {errors[name] && <p className="error">{errors[name].message}</p>}
                        </div>
                    )}
                />
            );

        default:
            return null;
    }
};

export default DynamicFormInput;
