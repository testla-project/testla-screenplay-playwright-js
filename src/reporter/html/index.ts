import { FullResult } from '@playwright/test/reporter';
import { STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay';
import {
    cpSync, existsSync,
    rmSync,
    writeFileSync,
} from 'fs';
import JsonReporter from '../json';

class HtmlReporter extends JsonReporter {
    protected outputDir: string;

    constructor(config: any) {
        super(config);
        this.outputDir = `${config.configDir}/${config.outputDir || 'screenplay-report'}`;
    }

    protected write(content: string) {
        if (this.outputDir) {
            writeFileSync(`${this.outputDir}/files/report.js`, content);
        }
    }

    onBegin() {
        if (this.outputDir && existsSync(this.outputDir)) {
            rmSync(this.outputDir, { recursive: true, force: true });
        }
        // mkdirSync(this.outputDir);
        cpSync(`${__dirname}/src`, this.outputDir, { recursive: true });

        process.env[STRUCTURED_LOGS_ENVVAR_NAME] = 'true';
    }

    onEnd(result: FullResult): void {
        const report = {
            ...result,
            executions: this.executions,
        };
        this.write(`const report = ${JSON.stringify(report)}`);
    }
}

export default HtmlReporter;
