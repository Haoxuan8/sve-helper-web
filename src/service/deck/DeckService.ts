import RemoteCall from "@/service/RemoteCall";

const remoteCall = new RemoteCall("api/deck");

const addDeckAsync = (params: object): Promise<string> => {
    return remoteCall.post("addDeck", params);
};

export default {
    addDeckAsync,
}
