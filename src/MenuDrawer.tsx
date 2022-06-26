import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {
    Box, Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText
} from "@mui/material";
import config from "@/config";
import {matchPath, useLocation, useNavigate} from "react-router";

export type MenuDrawerProps = {
    visible: boolean;
    onClose: () => void;
} & NativeProps;

const defaultProps = {};

const MenuDrawer: FC<MenuDrawerProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const location = useLocation();
    const navigate = useNavigate();

    return withNativeProps(
        props,
        <Drawer
            anchor="left"
            open={props.visible}
            onClose={props.onClose}
        >
            <Box sx={{width: 250}}>
                <List>
                    {
                        config.menus.map(it => {
                            if (it.key === "divider") {
                                return <Divider/>;
                            }
                            const isSelected = matchPath(`/${it.key}/*`, location.pathname) != null;
                            return (
                                <ListItem key={it.key} sx={{px: 0}}>
                                    <ListItemButton
                                        selected={isSelected}
                                        onClick={() => {
                                            navigate(`/${it.key}`);
                                            props.onClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <it.Icon/>
                                        </ListItemIcon>
                                        <ListItemText primary={it.name}/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
        </Drawer>
    )
}

export default MenuDrawer;
