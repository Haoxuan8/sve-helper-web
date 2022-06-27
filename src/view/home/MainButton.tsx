import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Button, Typography} from "@mui/material";
import ArrowCircleRightSharpIcon
    from "@mui/icons-material/ArrowCircleRightSharp";
import {useNavigate} from "react-router";

export type MainButtonProps = {
    Icon: any;
    title: string;
    desc: string;
    path: string;
} & NativeProps;

const defaultProps = {};

const MainButton: FC<MainButtonProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const navigate = useNavigate();

    return withNativeProps(
        props,
        <div className="h-full text-neutral-300">
            <Button
                onClick={() => navigate(props.path)}
                fullWidth
                variant="outlined"
                startIcon={<props.Icon
                    className="text-neutral-500"
                    style={{fontSize: 36}}
                />}
                sx={{height: "100%", p: 2}}
                color="inherit"
                endIcon={<ArrowCircleRightSharpIcon
                    className="text-neutral-500"
                    style={{fontSize: 28}}
                />}
            >
                <div className="px-2 text-neutral-800 flex flex-col flex-auto items-start text-start">
                    <Typography variant="h6" component="div">
                        {props.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{fontSize: 16}}
                        component="div"
                    >
                        {props.desc}
                    </Typography>
                </div>
            </Button>
        </div>
    )
}

export default MainButton;
