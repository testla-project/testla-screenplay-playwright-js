/**
 * Methods for http requests
 */
export enum REQUEST_METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    HEAD = 'head',
}

/**
 * HTTP Header type
 */
export type Header = {
    [key: string]: any
};

/**
 * Response type which is returned from any request triggered by the HttpClient
 */
export type Response = {
    body: any;
    status: number;
    headers: Header;
};

/**
 * InternalRequestMethod type for internal handling of the universal request method
 */
export type RequestMethod = REQUEST_METHOD;
