import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import SettingsIcon from "@mui/icons-material/Settings";

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
        key: "setting",
        component: () => import("./view/setting/Setting"),
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
    {key: "divider"},
    {
        key: "setting",
        name: "设置",
        Icon: SettingsIcon,
    },
]

export default {
    routes,
    menus,
}
