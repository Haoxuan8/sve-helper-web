import {QA} from "@/typing/QA";

export enum Craft {
    Neutral = "Neutral",
    Nightmare = "Nightmare",
    Forest = "Forest",
    Dragon = "Dragon",
    Haven = "Haven",
    Rune = "Rune",
    Sword = "Sword",
}

export const craftName = {
    [Craft.Forest]: "精灵",
    [Craft.Rune]: "法师",
    [Craft.Dragon]: "龙族",
    [Craft.Nightmare]: "梦魇",
    [Craft.Haven]: "主教",
    [Craft.Sword]: "皇家",
    [Craft.Neutral]: "中立",
}

export enum CardType {
    Follower = "Follower",
    FollowerEvo = "FollowerEvo",
    Spell = "Spell",
    Amulet = "Amulet",
    Leader = "Leader",
    FollowerToken = "FollowerToken",
}

export const cardTypeName = {
    [CardType.Follower]: "随从",
    [CardType.FollowerEvo]: "随从·进化",
    [CardType.Spell]: "法术",
    [CardType.Amulet]: "护符",
    [CardType.Leader]: "主战者",
    [CardType.FollowerToken]: "Token",
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

export const rareName = {
    [Rare.LG]: "LG",
    [Rare.GR]: "GR",
    [Rare.SR]: "SR",
    [Rare.BR]: "BR",
    [Rare.GRP]: "GRP",
    [Rare.SRP]: "SRP",
    [Rare.BRP]: "BRP",
    [Rare.SL]: "SL",
    [Rare.UR]: "UR",
}

export enum Category {
    BP01 = "BP01",
    SD01 = "SD01",
    SD02 = "SD02",
    SD03 = "SD03",
    SD04 = "SD04",
    SD05 = "SD05",
    SD06 = "SD06",
}

export const categoryName = {
    [Category.BP01]: "[BP01]ブースターパック第1弾 「創世の夜明け」",
    [Category.SD01]: "[SD01]スターターデッキ第1弾 「麗しの妖精姫」",
    [Category.SD02]: "[SD02]スターターデッキ第2弾 「怨讐刀鬼」",
    [Category.SD03]: "[SD03]スターターデッキ第3弾 「神秘錬成」",
    [Category.SD04]: "[SD04]スターターデッキ第4弾 「蛇竜の爪牙」",
    [Category.SD05]: "[SD05]スターターデッキ第5弾 「永久なる定め」",
    [Category.SD06]: "[SD06]スターターデッキ第6弾 「穢れし洗礼」",
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

export interface CardDetailType extends Card {
    qas?: QA[],
    related_cards?: Card[];
}
