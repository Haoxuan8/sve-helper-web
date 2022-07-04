import RemoteCall from "@/service/RemoteCall";

const remoteCall = new RemoteCall("api/help");

const sendSuggestionAsync = (params: object): Promise<null> => {
    return remoteCall.post("sendSuggestion", params);
};

export default {
    sendSuggestionAsync,
}
