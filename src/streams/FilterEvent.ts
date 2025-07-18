import { checkIfLogEvent } from '@testla/screenplay';
import { Transform, TransformCallback } from 'stream';

export class FilterEventStream extends Transform {
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        const str = chunk.toString();
        if (checkIfLogEvent(str)) {
            this.push(chunk);
        }
        callback();
    }
}
