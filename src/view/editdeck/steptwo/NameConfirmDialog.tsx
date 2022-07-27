import React, {FC, useRef} from "react";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    DialogActions,
    Button
} from "@mui/material";
import {Field, Form} from "react-final-form";
import TextField from "@/component/formfield/TextField";
import ValidatorUtil from "@/util/ValidatorUtil";

const {composeValidators, required, max} = ValidatorUtil;

export type NameConfirmDialogProps = {
    visible: boolean;
    onClose: () => void;
    onOk: (name: string) => void;
} & NativeProps;

const defaultProps = {};

const NameConfirmDialog: FC<NameConfirmDialogProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const onSubmit = (values: any) => {
        props.onOk(values.name);
    }

    return withNativeProps(
        props,
        <Dialog
            fullWidth
            maxWidth="sm"
            open={props.visible}
            onClose={props.onClose}
        >
            <DialogTitle>确认卡组名称</DialogTitle>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, submitting, form, values}) => {
                    return (
                        <>
                            <DialogContent>
                                <Field
                                    validate={composeValidators(required, max(100))}
                                    variant="standard"
                                    fullWidth
                                    name="name"
                                    component={TextField}
                                    label="卡组名称"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    sx={{width: 100}}
                                    onClick={props.onClose}
                                >取消</Button>
                                <Button
                                    sx={{width: 100}}
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    保存
                                </Button>
                            </DialogActions>
                        </>
                    )
                }}
            />
        </Dialog>
    );
}

export default NameConfirmDialog;
