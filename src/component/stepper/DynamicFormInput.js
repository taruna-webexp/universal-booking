import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormInput from "../share/form/FormInput";
import FormInputSelect from "../share/form/SelectInput";
import DateTimePickerController from "../share/form/DateTime";

const DynamicFormInput = ({ control, field, errors }) => {
    console.log("fieldfield", field);
    const {
        type,
        name,
        placeholder,
        defaultValue,
        class: fieldClass,
        required,
        options,
        slot,
        subfield,
    } = field;

    // Generate validation rules
    const validation = required
        ? { required: `${placeholder || name} is required` }
        : {};

    switch (type) {
        case "text":
        case "number":
        case "email":
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
        case "calendar":
            return (
                <DateTimePickerController
                    name={name}
                    control={control}
                    label={placeholder}
                    placeholder={placeholder}
                    slot={slot}
                    subfield={subfield}
                    errors={errors}
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
