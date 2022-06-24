import {AlertProps} from "@/component/alert/Alert";
import show from "@/component/alert/show";

export type AlertErrorProps = Omit<AlertProps, "visible" | "severity">;

const error = (props: AlertErrorProps) => {
    return show({
        severity: "error",
        ...props,
    })
}

export default error;
