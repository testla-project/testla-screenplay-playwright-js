/**
 * HTTP Headers type
 */
export type Headers = {
    [key: string]: string;
};

export type ResponseBodyType = unknown;

/**
 * Response type which is returned from any request.
 *
 * @param T (optional) Response body type - usually one out of `Buffer` | `object` | `string` | `null`, defaults to `unknown`.
 */
export type Response<T = ResponseBodyType> = {
    body: T;
    status: number;
    headers: Headers;
    duration: number;
};

export type ResponseBodyFormat = 'json' | 'text' | 'buffer' | 'none';
