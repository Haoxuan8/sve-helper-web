import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useEffect, useRef, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Card} from "@/typing/Card";
import _ from "lodash";
import DefaultCardCover from "@/asset/image/default_card_cover.png";
import {useInViewport, useRequest} from "ahooks";

const getImageUrl = (card: Card): string => {
    const base = "https://shadowverse-evolve.com/wordpress/wp-content/images/cardlist";
    let cardNo = card.card_no;
    if (_.startsWith(card.card_no, "BP")) {
        cardNo = cardNo.toLowerCase();
        cardNo = _.replace(cardNo, "-", "_");
    }
    return `${base}/${card.from}/${cardNo}.png`;
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
    card: Card,
    onClick?: () => void,
} & NativeProps;

const defaultProps = {};

const CardCover: FC<CardCoverProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const ref = useRef<HTMLDivElement>(null);
    const [inViewport] = useInViewport(ref);
    const [loaded, setLoaded] = useState(false);
    const {run, loading} = useRequest(fetchImage, {
        manual: true,
        onSuccess: () => {
            setLoaded(true);
        },
    });

    useEffect(() => {
        if (inViewport && !loading && !loaded) {
            run(getImageUrl(props.card));
        }
    }, [inViewport]);

    return withNativeProps(
        props,
        (
            <div
                ref={ref}
                className={`relative transition-all ${props.onClick == null ? "" : "cursor-pointer md:hover:scale-110 md:hover:drop-shadow-md"}`}
                onClick={props.onClick}
            >
                <img style={{opacity: loaded ? 0 : 1}}
                     className="duration-300 absolute inset-0"
                     src={DefaultCardCover}/>
                <img
                    className="h-auto w-full transition-opacity duration-300"
                    style={{opacity: loaded ? 1 : 0}}
                    src={loaded ? getImageUrl(props.card) : DefaultCardCover}
                />
            </div>
        )
    )
}

export default CardCover;
