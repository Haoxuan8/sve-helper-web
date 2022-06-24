import Alert, {AlertProps} from "@/component/alert/Alert";
import {renderImperatively} from "@/util/renderImperatively";
import getContainer from "@/component/alert/getContainer";
import React from "react";

export type AlertShowProps = Omit<AlertProps, "visible">;

const show = (props: AlertShowProps) => {
    const handler = renderImperatively(
        <Alert {...props} />,
        getContainer,
    );
    return handler;
}

export default show;
