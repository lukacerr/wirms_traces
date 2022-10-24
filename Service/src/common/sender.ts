import { Request, Response } from 'express';
import HttpCodes from 'utils/httpCodes';
import Log from 'models/logModel';
import IMethod, { methodIsAsync } from 'interfaces/IMethod';
import { convertToResponse } from 'interfaces/IResponse';

// ! Basic response class & constructor
class BaseResponse {
  error: boolean;

  content: unknown;

  constructor(content: unknown, error = false) {
    this.error = error;
    this.content = content;
  }
}

// ! Success handling
export const SuccessHandler = (res: Response, data: unknown, code: number) => {
  console.log('\x1b[32m%s\x1b[0m', 'RETURNING:', JSON.stringify(data));
  res.status(code).json(new BaseResponse(data));
};

// ! Error handling
export const ErrorHandler = async (req: Request, res: Response, e: unknown, code: number, unhandled = true) => {
  try {
    await new Log({
      information: e,
      unhandled,
      code,
      path: req.originalUrl,
      method: req.method,
    }).save();

    console.error('\x1b[31m%s\x1b[0m', `[${code}] ERROR:`, `${(e as Error)?.stack ?? e}`);
    return res.status(code).json(new BaseResponse((e as Error)?.message ?? e, true));
  } catch (e2: unknown) {
    console.error('\x1b[31m%s\x1b[0m', `DATABASE ERROR: ${(e2 as Error)?.stack ?? e2}`);
    return res.status(code).json(new BaseResponse({ initial_error: e, db_error: e2 }, true));
  }
};

// ! Default method
export const Execute = async (
  req: Request,
  res: Response,
  f: IMethod,
  code = HttpCodes.OK,
) => {
  try {
    const data = convertToResponse(methodIsAsync(f) ? await f(req, res) : f(req, res), code);
    SuccessHandler(res, data.value === undefined ? null : data.value, data.code ?? code);
  } catch (e: unknown) {
    const val = Boolean((e as { name: string }).name === 'ValidationError');
    await ErrorHandler(req, res, e, val ? HttpCodes.BAD_REQUEST : HttpCodes.INTERNAL_SERVER_ERROR, val);
  }
};
