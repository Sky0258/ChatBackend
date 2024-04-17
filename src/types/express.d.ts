import { Response } from 'express';

declare module 'express' {
    interface Response {
        cc: (err: Error | string, status?: number) => void;
    }
}