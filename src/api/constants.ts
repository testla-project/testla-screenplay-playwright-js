/**
 * Methods for HTTP requests
 */
export enum RequestMethod {
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
export type RequestMethodType = RequestMethod;
