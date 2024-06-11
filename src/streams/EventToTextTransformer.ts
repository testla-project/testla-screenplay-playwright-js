import { ACTIVITY_TYPE, EXEC_STATUS } from '@testla/screenplay';
import { ExecStatus, LogEvent } from '@testla/screenplay/lib/interfaces';
import { Transform, TransformCallback } from 'stream';
import { ICON } from '../constants';

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

    // eslint-disable-next-line no-underscore-dangle
    _transform(record: LogEvent, encoding: BufferEncoding, callback: TransformCallback) {
        const msg = `${
            record.time
        }  [${
            TransformEventToTextStream.getStatusText(record.status)
        }]  ${
            record.status !== EXEC_STATUS.FAILED ? (record.activityType === ACTIVITY_TYPE.QUESTION ? ICON.PASS : ICON.EXEC) : ICON.FAIL
        } ${
            record.actor
        } ${
            record.activity
        } ${
            record.activityText
        }  (${record.filePath})`;

        this.push(msg);
        callback();
    }
}
