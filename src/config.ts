type MenuItem = {
    name: string;
    key: string;
    component: () => any;
}

const menus: MenuItem[] = [
    {
        name: "CARD LIST",
        key: "card-list",
        component: () => import("./view/cardlist/CardList"),
    }
];

export default {
    menus,
}
