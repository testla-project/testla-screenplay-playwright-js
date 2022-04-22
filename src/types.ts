export type SubSelector = [
    string, {
        hasText?: string;
        subSelector?: SubSelector;
    }?
];

export type SelectorOptions = {
    hasText?: string | RegExp | undefined;
    subSelector?: SubSelector;
};
