import { getStatusIcon, getStatusText } from '@testla/screenplay';
import { LOGGING_BLANKS_PER_INDENTATION_LEVEL } from '@testla/screenplay/lib/constants';
import { LogEvent } from '@testla/screenplay/lib/interfaces';
import { Transform, TransformCallback } from 'stream';

export class TransformEventToTextStream extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    private static indent(level: number) {
        let indentation = ' ';

        for (let i = 0; i <= level * LOGGING_BLANKS_PER_INDENTATION_LEVEL; i += 1) {
            indentation = ` ${indentation}`;
        }

        return indentation;
    }

    _transform(record: LogEvent, encoding: BufferEncoding, callback: TransformCallback) {
        const msg = `${
            record.time
        }  [${
            getStatusText(record.status)
        }]${
            TransformEventToTextStream.indent(record.wrapLevel)
        }${
            getStatusIcon(record.status)
        } ${
            record.actor
        } ${
            record.activityAction
        } ${
            record.activityDetails
        }  (${record.location?.file}:${record.location?.line})`;

        this.push(msg);
        callback();
    }
}
