import { ACTIVITY_TYPE, EXEC_STATUS } from '@testla/screenplay';
import { ExecStatus, LogEvent } from '@testla/screenplay/lib/interfaces';
import { Transform, TransformCallback } from 'stream';
import { BLANKS_PER_INDENTATION_LEVEL, ICON } from '../constants';

export class TransformEventToTextStream extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    private static getStatusText(status: ExecStatus) {
        let badge = '';
        switch (status) {
            case EXEC_STATUS.START:
                badge = 'EXEC';
                break;
            case EXEC_STATUS.FAILED:
                badge = 'FAIL';
                break;
            case EXEC_STATUS.SKIPPED:
                badge = 'SKIP';
                break;
            default:
                badge = 'DONE';
        }
        return badge;
    }

    private static indent(level: number) {
        let indentation = ' ';

        for (let i = 0; i <= level * BLANKS_PER_INDENTATION_LEVEL; i += 1) {
            indentation = ` ${indentation}`;
        }

        return indentation;
    }

    // eslint-disable-next-line no-underscore-dangle
    _transform(record: LogEvent, encoding: BufferEncoding, callback: TransformCallback) {
        const msg = `${
            record.time
        }  [${
            TransformEventToTextStream.getStatusText(record.status)
        }]${
            TransformEventToTextStream.indent(record.wrapLevel)
        }${
            record.status !== EXEC_STATUS.FAILED ? (record.activityType === ACTIVITY_TYPE.QUESTION ? ICON.PASS : ICON.EXEC) : ICON.FAIL
        } ${
            record.actor
        } ${
            record.activityAction
        } ${
            record.activityDetails
        }  (${record.filePath})`;

        this.push(msg);
        callback();
    }
}
