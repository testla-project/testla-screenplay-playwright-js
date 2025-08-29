import { ResponseBodyType, Headers, Response as ResponseType } from "../../types";

export type QuestionResponseCheckCommand = 
    | {
        method: 'checkStatus';
        args: [response: ResponseType, statusCode: number, condition: 'equal' | 'unequal'];
    }
    | {
        method: 'checkBody';
        args: [response: ResponseType, body: ResponseBodyType, condition: 'equal' | 'unequal'];
    }
    | {
        method: 'checkHeaders';
        args: [response: ResponseType, headers: Headers, condition: 'included' | 'excluded'];
    }
    | {
        method: 'checkDuration';
        args: [response: ResponseType, duration: number, condition: 'lessOrEqual' | 'greater'];
    };