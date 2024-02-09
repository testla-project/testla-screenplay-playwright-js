import { Action, Actor } from '@testla/screenplay';
import { Download as PlaywrightDownload } from '@playwright/test';
import { Selector, SelectorOptions } from '../types';
import { Wait } from './Wait';
import { Click } from './Click';

/**
 * Action Class. Download.
 */
export class Download extends Action {
    selector: Selector;

    options: (SelectorOptions & { filepath?: string | undefined; filename?: string | undefined; }) | undefined;

    private constructor(selector: Selector, options?: SelectorOptions & { filepath?: string; filename?: string }) {
        super();
        this.selector = selector;
        this.options = options;
    }

    /**
     * Downloads the file.
     *
     * @param {Actor} actor Actor performing this action
     * @return {boolean} returns true if download is successful
     */
    public async performAs(actor: Actor): Promise<boolean> {
        const [download] = await Promise.all([
            actor.attemptsTo(Wait.forEvent('download')),
            actor.attemptsTo(Click.on(this.selector, this.options)),
        ]);
        if (this.options?.filepath) {
            const fileName = this.options?.filename || (download as unknown as PlaywrightDownload).suggestedFilename();
            const filePath = `${this.options?.filepath}/${fileName}`;
            await (download as unknown as PlaywrightDownload).saveAs(filePath);
        } else {
            await (download as unknown as PlaywrightDownload).path();
        }
        return true;
    }

    /**
     * Download file
     *
     * @param {Selector} selector the selector to start the download.
     * @param {SelectorOptions} options (optional) the selector options including a potential filepath and filename.
     * @return {Download} new Download instance
     */
    public static file(selector: Selector, options?: SelectorOptions & { filepath?: string; filename?: string }): Download {
        const instance = new Download(selector, options);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }
}
