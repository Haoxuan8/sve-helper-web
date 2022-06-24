import RemoteCall from "@/service/RemoteCall";
import {Card} from "@/typing/Card";

const remoteCall = new RemoteCall("api/card");

const getCardListAsync = (params: object): Promise<{ total: number, list: Card[] }> => {
    return remoteCall.post("getCardList", params);
};

export default {
    getCardListAsync,
};
