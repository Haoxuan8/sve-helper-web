import {HttpType, HttpMethod, request} from "@/util/RequestUtil";
import urljoin from "url-join";

export default class RemoteCall {
    private readonly relativeURL: string;

    constructor(relativeURL: string) {
        this.relativeURL = relativeURL;
    }

    post = (methodName: string, params: object): Promise<any> => {
        return request({
            path: urljoin(this.relativeURL, methodName),
            method: HttpMethod.POST,
            contentType: HttpType.JSON,
            responseType: HttpType.JSON,
            params,
        })
    }
}
