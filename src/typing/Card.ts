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
    SpellToken = "SpellToken",
    AmuletToken = "AmuletToken",
}

export const cardTypeName = {
    [CardType.Follower]: "从者",
    [CardType.FollowerEvo]: "从者·进化",
    [CardType.Spell]: "法术",
    [CardType.Amulet]: "护符",
    [CardType.Leader]: "主战者",
    [CardType.FollowerToken]: "从者·Token",
    [CardType.SpellToken]: "法术·Token",
    [CardType.AmuletToken]: "护符·Token",
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
    SP = "SP",
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
    [Rare.SP]: "SP",
}

export enum Category {
    BP01 = "BP01",
    SD01 = "SD01",
    SD02 = "SD02",
    SD03 = "SD03",
    SD04 = "SD04",
    SD05 = "SD05",
    SD06 = "SD06",
    BP02 = "BP02",
}

export const categoryName = {
    [Category.BP01]: "[BP01]ブースターパック第1弾 「創世の夜明け」",
    [Category.SD01]: "[SD01]スターターデッキ第1弾 「麗しの妖精姫」",
    [Category.SD02]: "[SD02]スターターデッキ第2弾 「怨讐刀鬼」",
    [Category.SD03]: "[SD03]スターターデッキ第3弾 「神秘錬成」",
    [Category.SD04]: "[SD04]スターターデッキ第4弾 「蛇竜の爪牙」",
    [Category.SD05]: "[SD05]スターターデッキ第5弾 「永久なる定め」",
    [Category.SD06]: "[SD06]スターターデッキ第6弾 「穢れし洗礼」",
    [Category.BP02]: "[BP02]ブースターパック第2弾「黒銀のバハムート」",
}

export enum Ability {
    Fanfare,
    LastWord,
    Startup,
    Evolve,
    Evolving,
    Storm,
    Rush,
    Guard,
    Drain,
    Kill,
    Scarlet,
    Awaken,
    DAttack,
    Pressure,
    Aura,
    NCharge,
    SCharge,
    Quick,
    Stack,
    EarthMystery,
}

export const abilityName = {
    [Ability.Fanfare]: "入场曲",
    [Ability.LastWord]: "谢幕曲",
    [Ability.Startup]: "启动",
    [Ability.Evolve]: "进化",
    [Ability.Evolving]: "进化时",
    [Ability.Storm]: "疾驰",
    [Ability.Rush]: "突进",
    [Ability.Guard]: "守护",
    [Ability.Drain]: "吸血",
    [Ability.Kill]: "必杀",
    [Ability.Scarlet]: "真红",
    [Ability.Awaken]: "觉醒",
    [Ability.DAttack]: "指定攻击",
    [Ability.Pressure]: "威压",
    [Ability.Aura]: "灵气",
    [Ability.NCharge]: "死灵充能",
    [Ability.SCharge]: "魔力连锁",
    [Ability.Quick]: "快速",
    [Ability.Stack]: "积蓄",
    [Ability.EarthMystery]: "土之秘术",
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
