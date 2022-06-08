/**
 * HTTP Headers type
 */
export type Headers = {
    [key: string]: string;
};

export type ResponseBodyType = object | string | null;

/**
 * Response type which is returned from any request
 */
export type Response = {
    body: ResponseBodyType;
    status: number;
    headers: Headers;
    duration: number;
};

export type ResponseBodyFormat = 'json' | 'text' | 'none';
