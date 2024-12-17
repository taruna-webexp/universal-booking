import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";
import FormInput from "../share/form/FormInput";
import FormInputSelect from "../share/form/SelectInput";

const DynamicFormInput = ({ control, field, errors }) => {
    switch (field.type) {
        case "text":
        case "number":
            return (
                <FormInput
                    // key={index}
                    control={control}
                    name={field.name}
                    value=""
                    inputType={field.type}
                    label={field.placeholder}

                    defaultValue={field.defaultValue}
                    placeholder={field.placeholder}
                    errors={errors}
                    className={field.class}
                />
            );

        case "select":
            return (
                <FormInputSelect
                    name={field.name}
                    value=""
                    control={control}
                    label={field.placeholder}
                    id={name}
                    {...field}
                    defaultValue={field.defaultValue}
                    errors={errors}
                    className={field.class}
                    options={field.options}
                    placeholder={field.placeholder} />
            );

        case "checkbox":
            return (
                <Controller
                    name={field.name}
                    control={control}
                    errors={errors}
                    defaultValue={field.value || false}
                    render={({ field: controllerField }) => (
                        <div className={field.class}>
                            <Checkbox {...controllerField} />
                            <label>{field.placeholder}</label>
                        </div>
                    )}
                />
            );

        default:
            return null;
    }
};

export default DynamicFormInput;
