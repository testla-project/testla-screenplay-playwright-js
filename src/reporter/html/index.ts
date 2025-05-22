import { FullResult } from '@playwright/test/reporter';
import { STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay';
import { appendFileSync, cpSync, existsSync, mkdirSync, rm } from 'fs';
import JsonReporter from '../json';

class HtmlReporter extends JsonReporter {
    protected outputDir: string;

    constructor(config: any) {
        super(config);
        this.outputDir = config.configDir || 'screenplay-report';
    }

    protected write(content: string) {
        if (this.outputDir) {
            appendFileSync(`${this.outputDir}/report.js`, content);
        }
    }

    onBegin() {
        if (this.outputDir && existsSync(this.outputDir)) {
            rm(this.outputDir, { recursive: true, force: true }, (err) => {
                if (err) {
                    throw err;
                }
            });
            // mkdirSync(this.outputDir);
            cpSync('src', this.outputDir, { recursive: true });
        }

        process.env[STRUCTURED_LOGS_ENVVAR_NAME] = 'true';
    }

    onEnd(result: FullResult): void {
        const report = {
            ...result,
            executions: this.executions,
        };
        this.write(JSON.stringify(report));
    }
}

export default HtmlReporter;
