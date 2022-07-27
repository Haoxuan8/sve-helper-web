import React, {FC} from "react";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Container} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Field, Form} from "react-final-form";
import {isEmpty} from "lodash";
import TextField from "@/component/formfield/TextField";
import {StepOnePageProps} from "@/view/editdeck/stepone/StepOneType";

export type EnterCodePageProps = {} & StepOnePageProps & NativeProps;

const defaultProps = {};

const EnterCodePage: FC<EnterCodePageProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    const onSubmit = () => {
    }

    return withNativeProps(
        props,
        <Box>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, submitting, form, values}) => {
                    return (
                        <Box
                            noValidate onSubmit={handleSubmit}
                            component="form" autoComplete="off"
                        >
                            <Container maxWidth="md">
                                <Box>
                                    <Field
                                        variant="filled"
                                        fullWidth
                                        name="code"
                                        component={TextField}
                                        label="卡组代码"
                                    />
                                </Box>
                                <Box sx={{mt: 6}}>
                                    <LoadingButton
                                        disabled={isEmpty(values.code)}
                                        fullWidth
                                        variant="contained"
                                    >
                                        下一步
                                    </LoadingButton>
                                </Box>
                            </Container>
                        </Box>
                    )
                }}
            />
        </Box>
    );
}

export default EnterCodePage;
