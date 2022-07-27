import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box} from "@mui/material";
import {Field, Form} from "react-final-form";
import TextField from "@/component/formfield/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import sleep from "@/util/sleep";
import HelpService from "@/service/help/HelpService";
import Alert from "@/component/alert";
import ValidatorUtil from "@/util/ValidatorUtil";

export type SuggestionBoxProps = {} & NativeProps;

const defaultProps = {};

const {composeValidators, required, max} = ValidatorUtil;

const SuggestionBox: FC<SuggestionBoxProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (values: any) => {
        await HelpService.sendSuggestionAsync({
            title: values.title,
            content: values.content,
        });
        Alert.show({
            severity: "success",
            children: "提交成功，感谢对本网站的支持！",
        });
        setSubmitted(true);
    }

    return withNativeProps(
        props,
        <Box sx={{my: 2}}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, submitting, form, values}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Field
                                validate={composeValidators(required, max(100))}
                                name="title"
                                component={TextField}
                                label="标题"
                                fullWidth
                                variant="filled"
                            />
                            <Box sx={{my: 4}}>
                                <Field
                                    validate={composeValidators(required, max(1000))}
                                    name="content"
                                    component={TextField}
                                    label="内容"
                                    fullWidth
                                    multiline
                                    minRows={10}
                                    variant="filled"
                                />
                            </Box>
                            <Box className="flex justify-end">
                                <LoadingButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="medium"
                                    endIcon={<SendIcon />}
                                    loading={submitting}
                                    disabled={submitted}
                                >
                                    {submitted ? "已提交" : "提交"}
                                </LoadingButton>
                            </Box>
                        </form>
                    )
                }}
            />
        </Box>
    )
}

export default SuggestionBox;
