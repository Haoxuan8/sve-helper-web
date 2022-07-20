import {mergeProps} from "@/util/withDefaultProps";
import {useLocalStorageState} from "ahooks";
import dayjs from "dayjs";

export type UseOnceOption = {
    expire?: number;
}

const defaultOption = {
    expire: 24 * 60 * 60 * 1000,
}

const useOnce = (key: string, o?: UseOnceOption): [boolean, () => void] => {
    const option = mergeProps(defaultOption, o);
    const [value, setValue] = useLocalStorageState<number | undefined>(
        key,
    );

    const getIsExpired = () => value == undefined || dayjs().valueOf() > value;

    const setExpireTime = () => {
        if (getIsExpired()) {
            setValue(dayjs().valueOf() + option.expire);
        }
    }

    return [getIsExpired(), setExpireTime];
}

export default useOnce;
