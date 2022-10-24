import { ErrorHandler } from 'common/sender';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  await ErrorHandler(req, res, `Path '${req.originalUrl}' (${req.method}) not found`, 404);
};
