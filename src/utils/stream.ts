import { Readable } from 'stream';

export const streamToString = (stream: Readable): Promise<string> => {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk: string) => chunks.push(Buffer.from(`${chunk}\n`)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
};
