import { NextFunction } from 'express';
import { Request, Response } from 'express';
export declare const handleException: (error: Error, req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
