import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps
} from "@mui/material";
import React, {FC} from "react";
import {FieldInputProps, FieldMetaState} from "react-final-form";

export type TextFiledProps = {
    input: FieldInputProps<string>,
    meta: FieldMetaState<string>,
} & MuiTextFieldProps;

const TextField: FC<TextFiledProps> = ({
                                           input: {
                                               name,
                                               onChange,
                                               value,
                                               ...restInput
                                           },
                                           meta,
                                           ...rest
                                       }) => {
    return (
        <MuiTextField
            {...rest}
            name={name}
            helperText={meta.touched ? meta.error : undefined}
            error={meta.error && meta.touched}
            inputProps={restInput}
            onChange={onChange}
            value={value}
        />
    )
}

export default TextField;
