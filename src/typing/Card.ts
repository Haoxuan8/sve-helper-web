export enum Craft {
    Neural = "Neural",
    Nightmare = "Nightmare",
    Forest = "Forest",
    Dragon = "Dragon",
    Haven = "Haven",
    Rune = "Rune",
    Sword = "Sword",
}

export enum CardType {
    Follower = "Follower",
    FollowerEvo = "FollowerEvo",
    Spell = "Spell",
    Amulet = "Amulet",
    Leader = "Leader",
    FollowerToken = "FollowerToken",
}

export enum Rare {
    LG = "LG",
    GR = "GR",
    SR = "SR",
    BR = "BR",
    GRP = "GR_P",
    SRP = "SR_P",
    BRP = "BR_P",
    SL = "SL",
    UR = "UR",
}

export interface Card {
    attack: number;
    card_no: string;
    card_type: CardType;
    cost: number;
    craft: Craft;
    created_at: number;
    desc_cn: string;
    desc_jp: string;
    drawer: string;
    from: string;
    id: number;
    img_url: string;
    life: number;
    name_cn: string;
    name_jp: string;
    rare: Rare;
    related_card_nos: string;
    type: string;
}
