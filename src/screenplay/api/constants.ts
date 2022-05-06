/**
 * Methods for HTTP requests
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
 * Type for internal handling of the universal request method
 */
export type RequestMethod = REQUEST_METHOD;
