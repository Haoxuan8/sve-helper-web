import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Card} from "@/typing/Card";
import {startsWith, replace, split} from "lodash";
import DefaultCardCover from "@/asset/image/default_card_cover.png";
import {useInViewport, useRequest} from "ahooks";
import {buildCard} from "@/component/card/util";

export const getCardImageUrl = (card: { from: string, card_no: string }, proxy: boolean = false): string => {
    const base = "https://shadowverse-evolve.com/wordpress/wp-content/images/cardlist";
    const proxyBase = "https://www.svehelperwin.com/images";
    let cardNo = card.card_no;
    if (startsWith(card.card_no, "BP")) {
        cardNo = cardNo.toLowerCase();
        cardNo = replace(cardNo, "-", "_");
    }
    return proxy ? `${proxyBase}/${card.from}/${cardNo}.png` : `${base}/${card.from}/${cardNo}.png`;
}

const fetchImage = async (src: string) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            resolve(true);
        };
        image.onerror = () => {
            reject("image load failed");
        }
    })
}

export type CardCoverProps = {
    card?: Card,
    cardNo?: string, // 只传cardNo
    onClick?: () => void,
    children?: ReactNode,
} & NativeProps;

const defaultProps = {};

const CardCover: FC<CardCoverProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const ref = useRef<HTMLImageElement>(null);
    const [inViewport] = useInViewport(ref);
    const [loaded, setLoaded] = useState(false);
    const [card, setCard] = useState(buildCard(props.card, props.cardNo));
    const {run, loading} = useRequest(fetchImage, {
        manual: true,
        onSuccess: () => {
            setLoaded(true);
        },
    });


    useEffect(() => {
        if (inViewport && !loading && !loaded) {
            run(getCardImageUrl(card));
        }
    }, [inViewport]);

    return withNativeProps(
        props,
        (
            <div
                ref={ref}
                className={`relative transition-all ${props.onClick == null ? "" : "cursor-pointer md:hover:scale-110 md:hover:drop-shadow-md"}`}
                onClick={props.onClick}
                style={{minHeight: 100}}
            >
                <img
                    className="absolute inset-0 transition-opacity duration-300 z-10"
                    style={{opacity: loaded ? 1 : 0}}
                    src={loaded ? getCardImageUrl(card) : DefaultCardCover}
                />
                <img
                    style={{opacity: loaded ? 0 : 1}}
                    className="duration-300 h-auto w-full"
                    src={DefaultCardCover}
                />
                {
                    props.children != null && (
                        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
                            {props.children}
                        </div>
                    )
                }
            </div>
        )
    )
}

export default CardCover;
