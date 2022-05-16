export type SubSelector = [
    string, {
        hasText?: string;
        timeout?: number;
        subSelector?: SubSelector;
    }?
];

export type SelectorOptions = {
    hasText?: string | RegExp | undefined;
    subSelector?: SubSelector;
    timeout?: number;
};
