import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import SettingsIcon from "@mui/icons-material/Settings";
import ForwardToInboxIcon
    from "@mui/icons-material/ForwardToInbox";
import PrintIcon from "@mui/icons-material/Print";

type RouteItem = {
    key: string;
    component: () => any;
}

const routes: RouteItem[] = [
    {
        key: "home",
        component: () => import("./view/home/Home"),
    },
    {
        key: "card-list",
        component: () => import("./view/cardlist/CardList"),
    },
    {
        key: "print",
        component: () => import("./view/print/Print"),
    },
    {
        key: "setting",
        component: () => import("./view/setting/Setting"),
    },
    {
        key: "suggestion",
        component: () => import("./view/suggestion/SuggestionBox"),
    },
    {
        key: "edit-deck",
        component: () => import("./view/editdeck/EditDeck"),
    }
];

type MenuItem = {
    key: string;
    name?: string;
    Icon?: any;
}

const menus: MenuItem[] = [
    {
        key: "home",
        name: "首页",
        Icon: HomeIcon,
    },
    {key: "divider"},
    {
        key: "card-list",
        name: "卡牌列表",
        Icon: StyleIcon,
    },
    {
        key: "print",
        name: "打印卡牌",
        Icon: PrintIcon,
    },
    {key: "divider"},
    {
        key: "setting",
        name: "设置",
        Icon: SettingsIcon,
    },
    {
        key: "suggestion",
        name: "意见箱",
        Icon: ForwardToInboxIcon,
    }
]

export default {
    routes,
    menus,
}
