import {FieldInputProps, FieldMetaState} from "react-final-form";
import {
    Checkbox as MuiCheckbox,
    FormControl, FormControlLabel, FormGroup,
    FormControlProps, FormHelperText, FormLabel,
} from "@mui/material";
import React, {FC, useMemo} from "react";
import {includes, xor} from "lodash";

export type CheckboxGroupProps = {
    input: FieldInputProps<any>,
    meta: FieldMetaState<any>,
    formControlProps?: FormControlProps,
    options: { label: string, value: string }[],
    label: string,
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({
                                                   input: {
                                                       name,
                                                       value,
                                                       onChange,
                                                       ...restInput
                                                   },
                                                   meta,
                                                   label,
                                                   formControlProps,
                                                   options,
                                                   ...rest
                                               }) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

    return (
        <FormControl
            {...formControlProps}
            error={showError}
        >
            <FormLabel>{label}</FormLabel>
            <FormGroup row>
                {
                    options.map(it => {
                        const checked = includes(value, it.value);

                        return (
                            <FormControlLabel
                                key={it.value}
                                control={
                                    <MuiCheckbox
                                        checked={checked}
                                        onChange={() => onChange(xor(value, [it.value]))}
                                        name={it.value}
                                    />
                                }
                                label={it.label}
                            />
                        )
                    })
                }
            </FormGroup>
            {showError &&
                <FormHelperText>{meta.error || meta.submitError}</FormHelperText>
            }
        </FormControl>
    )
}

export default CheckboxGroup;
