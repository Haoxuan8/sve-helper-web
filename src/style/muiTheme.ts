import {createTheme} from "@mui/material";

export const primaryColor = "#000";
export const secondaryColor = "#7278A8";

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
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
    }
});

export default theme;
