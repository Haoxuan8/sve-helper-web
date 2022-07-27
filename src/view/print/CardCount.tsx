import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, ReactNode, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Button, IconButton} from "@mui/material";
import classNames from "classnames";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {useResponsive} from "ahooks";

export type CardCountProps = {
    count: number;
    onAddClick: () => void;
    onDecClick: () => void;
    max?: number | null;
    min?: number;
} & NativeProps;

const defaultProps = {
    max: null,
    min: 0,
};

type CardCountButtonProps = {
    onClick: () => void;
    Icon: any;
    primary: boolean;
    disabled?: boolean;
}

const CardCountButton: FC<CardCountButtonProps> = (props) => {
    const responsive = useResponsive();

    if (responsive.md) {
        if (props.primary) {
            return (
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={props.onClick}
                    disabled={props.disabled}
                >
                    <props.Icon />
                </Button>
            )
        } else {
            return (
                <Box
                    sx={{
                        backgroundColor: "#FFF",
                        borderRadius: 2,
                        overflow: "hidden"
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={props.onClick}
                        disabled={props.disabled}
                    >
                        <props.Icon />
                    </Button>
                </Box>
            )
        }
    } else {
        return (
            <Box
                sx={{backgroundColor: props.primary ? "secondary.main" : "#FFF"}}
                className={classNames("rounded-full")}
            >
                <IconButton disabled={props.disabled} onClick={props.onClick}>
                    <props.Icon sx={{color: props.primary ? "#FFF" : "primary.main"}} />
                </IconButton>
            </Box>
        )
    }
}

const CardCount: FC<CardCountProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const responsive = useResponsive();
    const [hovered, setHovered] = useState(false);

    return withNativeProps(
        props,
        <Box
            className={classNames("flex flex-col items-center h-full w-full hover:bg-black/30 transition opacity-0", {
                "opacity-100": hovered,
            })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Box sx={{height: responsive.md ? "30%" : "23%"}} />
            <Box
                className="text-2xl md:text-4xl text-white font-bold bg-black/50 py-1 px-3 rounded-xl"
            >
                {props.count}
            </Box>
            <Box
                className="flex mt-4 flex-row md:mt-8"
            >
                <div className="mr-2 md:mr-4">
                    <CardCountButton
                        onClick={props.onDecClick}
                        Icon={RemoveIcon}
                        primary={false}
                        disabled={!hovered || props.count <= props.min}
                    />
                </div>
                <CardCountButton
                    onClick={props.onAddClick}
                    Icon={AddIcon}
                    primary
                    disabled={!hovered || (props.max !== null && props.count >= props.max)}
                />
            </Box>
        </Box>
    )
}

export default CardCount;
