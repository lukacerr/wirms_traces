import { Execute } from 'common/sender';
import express from 'express';
import IMethod, { IMethodSettings } from 'interfaces/IMethod';
import IRouteSettings from 'interfaces/IRouteSettings';
import HttpCodes from 'utils/httpCodes';

export default class AppRoute {
  customPath: string | undefined;

  router: express.Router;

  constructor(settings: IRouteSettings | undefined = undefined) {
    this.customPath = settings?.customPath;
    this.router = express.Router(settings?.routerOptions);
  }

  static getRoute(s: IMethodSettings) {
    const path = s.path?.trim() ?? '/';
    return `${path.startsWith('/') ? '' : '/'}${path}`;
  }

  async GetMethod(f: IMethod, s: IMethodSettings = {}) {
    this.router.get(AppRoute.getRoute(s), async (req, res) => Execute(req, res, f));
  }

  async PostMethod(f: IMethod, s: IMethodSettings = {}) {
    this.router.post(AppRoute.getRoute(s), async (req, res) => Execute(req, res, f, HttpCodes.CREATED));
  }

  async DeleteMethod(f: IMethod, s: IMethodSettings = {}) {
    this.router.delete(AppRoute.getRoute(s), async (req, res) => Execute(req, res, f, HttpCodes.NO_CONTENT));
  }

  async PutMethod(f: IMethod, s: IMethodSettings = {}) {
    this.router.put(AppRoute.getRoute(s), async (req, res) => Execute(req, res, f));
  }
}
