import { Request, Response } from 'express';
import IResponse from 'interfaces/IResponse';
import { isAsyncFunction } from 'util/types';

export interface IMethodSettings { path?: string; aliases?: string[] }

export type IMethodAsync = (req: Request, res: Response) => Promise<IResponse | unknown>;

export type IMethodSync = (req: Request, res: Response) => IResponse | unknown;

export function methodIsAsync(m: IMethod): m is IMethodAsync { return isAsyncFunction(m); }

type IMethod = IMethodAsync | IMethodSync;
export default IMethod;
