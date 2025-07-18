import { parseLogEvent } from '@testla/screenplay';
import { Transform, TransformCallback } from 'stream';

export class ParseEventStream extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    _transform(chunk: string, encoding: BufferEncoding, callback: TransformCallback): void {
        const parsedChunk = parseLogEvent(chunk);
        this.push(parsedChunk);
        callback();
    }
}
