import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#000",
                }
            }
        }
    }
});

export default theme;
