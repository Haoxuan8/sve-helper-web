import attachPropertiesToComponent from "@/util/attachPropertiesToComponent";
import Alert from "@/component/alert/Alert";
import show from "@/component/alert/show";
import error from "@/component/alert/error";

export default attachPropertiesToComponent(Alert, {
    show,
    error,
});
