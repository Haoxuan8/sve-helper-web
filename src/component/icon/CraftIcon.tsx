import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Craft} from "@/typing/Card";
import DragonIconPng from "@/asset/icon/dragon_icon.png";
import DragonIconActivePng from "@/asset/icon/dragon_icon_active.png";
import ForestIconPng from "@/asset/icon/forest_icon.png";
import ForestIconActivePng from "@/asset/icon/forest_icon_active.png";
import NightmareIconPng from "@/asset/icon/nightmare_icon.png";
import NightmareIconActivePng from "@/asset/icon/nightmare_icon_active.png";
import SwordIconPng from "@/asset/icon/sword_icon.png";
import SwordIconActivePng from "@/asset/icon/sword_icon_active.png";
import HavenIconPng from "@/asset/icon/haven_icon.png";
import HavenIconActivePng from "@/asset/icon/haven_icon_active.png";
import RuneIconPng from "@/asset/icon/rune_icon.png";
import RuneIconActivePng from "@/asset/icon/rune_icon_active.png";

export type CraftIconProps = {
    craft: Craft;
    active?: boolean;
    hoverActive?: boolean; // hover时是否高亮
    scale?: number;
    onClick: () => void;
} & NativeProps;

const defaultProps = {
    active: false,
    hoverActive: false,
    scale: 0.5,
};

const imgSrcMap: { [craft: string]: { base: string, active: string } } = {
    [Craft.Forest]: {
        base: ForestIconPng,
        active: ForestIconActivePng,
    },
    [Craft.Dragon]: {
        base: DragonIconPng,
        active: DragonIconActivePng,
    },
    [Craft.Haven]: {
        base: HavenIconPng,
        active: HavenIconActivePng,
    },
    [Craft.Rune]: {
        base: RuneIconPng,
        active: RuneIconActivePng,
    },
    [Craft.Nightmare]: {
        base: NightmareIconPng,
        active: NightmareIconActivePng,
    },
    [Craft.Sword]: {
        base: SwordIconPng,
        active: SwordIconActivePng,
    }
}

const CraftIcon: FC<CraftIconProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [hovered, setHovered] = useState(false);
    const imgSrc = imgSrcMap[props.craft];

    const src = hovered && props.hoverActive || props.active
        ? imgSrc.active
        : imgSrc.base

    return withNativeProps(
        props,
        <div
            onClick={props.onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img style={{}} src={src} />
        </div>
    )
}

export default CraftIcon;
