/**
 * HTTP Headers type
 */
export type Headers = {
    [key: string]: string
};

export type ResponseBodyType = Buffer | object | string | null;

/**
 * Response type which is returned from any request
 */
export type Response = {
    body: ResponseBodyType,
    status: number,
    headers: Headers,
};

export type ResponseBodyFormat = 'json' | 'text' | 'buffer' | 'none';
