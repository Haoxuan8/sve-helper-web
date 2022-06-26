import {
    FormControl,
    FormControlProps, FormHelperText, InputLabel,
    Select as MuiSelect,
    SelectProps as MuiSelectProps
} from "@mui/material";
import React, {FC} from "react";
import {FieldInputProps, FieldMetaState} from "react-final-form";

export type SelectProps = {
    input: FieldInputProps<any>,
    meta: FieldMetaState<any>,
    formControlProps?: FormControlProps,
} & MuiSelectProps;

const Select: FC<SelectProps> = ({
                                     input: {
                                         name,
                                         value,
                                         onChange,
                                         ...restInput
                                     },
                                     meta,
                                     label,
                                     formControlProps,
                                     ...rest
                                 }) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
    return (
        <FormControl {...formControlProps} error={showError}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <MuiSelect
                {...rest}
                name={name}
                label={label}
                onChange={onChange}
                inputProps={restInput}
                value={value}
            />
            {showError &&
                <FormHelperText>{meta.error || meta.submitError}</FormHelperText>
            }
        </FormControl>
    )
}

export default Select;
