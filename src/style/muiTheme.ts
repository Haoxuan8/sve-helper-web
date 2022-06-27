import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000"
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
