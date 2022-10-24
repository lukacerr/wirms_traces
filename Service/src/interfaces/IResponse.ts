import HttpCodes from 'utils/httpCodes';

export default interface IResponse { value: unknown; code?: number; }

export function isResponse(x: any): x is IResponse { return x?.value; }

export function convertToResponse(data: unknown, code = HttpCodes.OK): IResponse {
  return isResponse(data) ? data : { value: data, code };
}
