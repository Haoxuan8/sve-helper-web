import {
    createTheme,
    Theme,
    ThemeProvider as MuiThemeProvider
} from "@mui/material";
import React, {FC, useMemo} from "react";
import {useConfigContext} from "@/context/ConfigContextProvider";
import {themeColorMap, ThemeColorType} from "@/typing/Theme";

export type ThemeProviderProps = {};

const themeRef: { current: null | Theme } = {current: null};

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const [config] = useConfigContext();

    const theme = useMemo(() => {
        const newTheme = createTheme({
            palette: {
                primary: {
                    main: themeColorMap[config.primaryColorType] ?? themeColorMap[ThemeColorType.main],
                },
                secondary: {
                    main: config.secondaryColor,
                },
            },
            typography: {
                h6: {
                    fontWeight: "bold",
                },
                subtitle1: {
                    fontWeight: "bold",
                },
                caption: {
                    color: "rgb(107 114 128)",
                }
            },
            zIndex: {
                tooltip: 9999,
            }
        });
        themeRef.current = newTheme;
        return newTheme;
    }, [config.primaryColorType, config.secondaryColor]);

    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    )
}

export const useTheme = (): Theme | null => {
    return themeRef.current;
}

export default ThemeProvider;
