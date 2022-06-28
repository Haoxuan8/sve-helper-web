import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import {useLocalStorageState} from "ahooks";

type Config = {
    disableCardCover: boolean;
}

const initConfig: Config = {
    disableCardCover: false,
}

const ConfigContext = createContext<Config>(initConfig);

export type ConfigContextProviderProps = {};

export const changeConfigRef: { current: null | ((a: Partial<Config>) => void) } = {current: null};

const ConfigContextProvider: FC<ConfigContextProviderProps> = props => {
    const [configStored, setConfigStored] = useLocalStorageState<Config | undefined>(
        "sve-helper-setting-config",
    );
    const [config, setConfig] = useState<Config>(configStored ?? initConfig);

    useEffect(() => {
        setConfigStored(config);
    }, [config]);

    const changeConfig = useCallback((values: Partial<Config>) => {
        setConfig(prev => ({
            ...prev,
            ...values,
        }));
    }, []);

    useEffect(() => {
        changeConfigRef.current = changeConfig;
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
}

const nop = () => {
};

export const useConfigContext = (): [Config, ((a: Partial<Config>) => void)] => {
    return [useContext(ConfigContext), changeConfigRef.current ?? nop];
}

export default ConfigContextProvider;
