import { checkIfLogEvent } from '@testla/screenplay';
import { Transform, TransformCallback } from 'stream';

export class FilterEventStream extends Transform {
    // eslint-disable-next-line no-underscore-dangle
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        const str = chunk.toString();
        if (checkIfLogEvent(str)) {
            this.push(chunk);
        }
        callback();
    }
}
