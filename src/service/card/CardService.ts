import RemoteCall from "@/service/RemoteCall";
import {Card, CardDetailType} from "@/typing/Card";

const remoteCall = new RemoteCall("api/card");

const getCardListAsync = (params: object): Promise<{ total: number, list: Card[] }> => {
    return remoteCall.post("getCardList", params);
};

const getBuildDeckCardListAsync = (params: object): Promise<{ total: number, list: Card[] }> => {
    return remoteCall.post("getBuildDeckCardList", params);
};

const getCardDetailAsync = (params: object): Promise<CardDetailType> => {
    return remoteCall.post("getCardDetail", params);
};


const getCardPriceAsync = (params: object): Promise<string> => {
    return remoteCall.post("getCardPrice", params);
};

export type PriceDetail = {
    uut: { price: string, stock: string };
}

const getCardPriceDetailAsync = (params: object): Promise<PriceDetail> => {
    return remoteCall.post("getCardPriceDetail", params);
};

export default {
    getCardListAsync,
    getBuildDeckCardListAsync,
    getCardDetailAsync,
    getCardPriceAsync,
    getCardPriceDetailAsync,
};
