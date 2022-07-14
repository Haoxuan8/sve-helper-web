import {
    FormControl,
    FormControlProps, FormHelperText, FormLabel, Box,
    MenuItem,
} from "@mui/material";
import React, {FC} from "react";
import {FieldInputProps, FieldMetaState} from "react-final-form";
import {includes, xor} from "lodash";

export type SelectListProps = {
    input: FieldInputProps<any>,
    meta: FieldMetaState<any>,
    formControlProps?: FormControlProps,
    options: { label: string, value: string }[],
    label: string,
}

const SelectList: FC<SelectListProps> = ({
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
        <FormControl {...formControlProps} error={showError}>
            <FormLabel sx={{mb: 1}}>{label}</FormLabel>
            <Box
                sx={{borderColor: "rgba(0, 0, 0, 0.23)", borderRadius: 1}}
                className="border overflow-y-auto overflow-x-hidden h-36 relative"
            >
                {
                    options.map(it => {
                        const selected = includes(value, it.value);

                        return (
                            <MenuItem
                                key={it.value}
                                value={it.value}
                                selected={selected}
                                onClick={() => onChange(xor(value, [it.value]))}
                            >
                                {it.label}
                            </MenuItem>
                        )
                    })
                }
            </Box>
            {showError &&
                <FormHelperText>{meta.error || meta.submitError}</FormHelperText>
            }
        </FormControl>
    )
}

export default SelectList;
