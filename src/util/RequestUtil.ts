import queryString from "query-string";
import urljoin from "url-join";
import Alert from "@/component/alert";

export enum HttpMethod {
    POST = "POST",
    GET = "GET",
}

export enum HttpType {
    JSON = "json",
    FORM_DATA = "formData",
    FILE = "file",
}

// status为200时自定义的code
export enum CustomCode {
    UNAUTHORIZED = 401, // 暂未登录
    FORBIDDEN = 403, // 没有相关权限
    ERROR = 500,
    SUCCESS = 200,
    INVALID_PARAMS = 400, // 参数校验失败
    SERVICE_ERROR = 401,
}

export interface requestOptions {
    path: string,
    method: HttpMethod,
    contentType: HttpType,
    responseType: HttpType,
    params: object,
}

export interface customResponse {
    code: CustomCode,
    msg: string,
    data: any,
}

const requestCore = async (options: requestOptions) => {
    let headers = new Headers();

    let path = options.path;

    if (options.contentType === HttpType.FORM_DATA) {
        headers.append("Accept", "*/*");
    } else {
        headers.append("Accept", "application/json");
    }

    let body;
    if (options.contentType === HttpType.JSON) {
        headers.append("Content-Type", "application/json");
        body = JSON.stringify(options.params);

    } else if (options.contentType === HttpType.FORM_DATA) {
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        body = queryString.stringify(options.params);
    } else {
        //query params
        if (options.params != null) {
            path = `${path}?${queryString.stringify(options.params)}`;
        }
    }

    let response: Response;
    try {
        response = await fetch(urljoin(location.origin, path), {
            credentials: "same-origin",
            method: options.method,
            body,
            headers,
        });
    } catch (e) {
        console.log("fetch", e);
        throw new Error("网络连接失败，请重试!");
    }

    if (options.responseType === HttpType.JSON) {
        if (response && response.text && response.status) {
            const text = await response.text();

            let result = null;
            if (text !== "") {
                try {
                    result = JSON.parse(text);
                } catch (e) {
                    console.warn(e);
                    console.log(text);
                }
            }

            if (response.status === 200) {
                result = result as customResponse;
                if (result.code === CustomCode.UNAUTHORIZED) {
                    // redirect to login
                    // 额外的逻辑处理
                    throw new Error(result.msg);
                } else if (result.code === CustomCode.INVALID_PARAMS) {
                    throw new Error(`请求参数错误：${result.msg}`);
                } else if (result.code !== CustomCode.SUCCESS) {
                    throw new Error(result.msg);
                } else {
                    return result.data;
                }
            } else {
                throw new Error(text);
            }
        } else {
            throw new Error("网络连接失败，请重试!");
        }
    } else if (options.responseType === HttpType.FILE) {
        if (response.status === 200) {
            const b = await response.blob();
            return b;
        } else {
            throw new Error("文件下载失败");
        }
    }
}

export const request = (options: requestOptions) => {
    return new Promise((resolve, reject) => {
        return requestCore(options)
            .then(
                resolve,
                error => {
                    Alert.error({
                        children: error?.message,
                    })
                    reject(error);
                }
            )
    })
}
