import cors from 'cors';
import express from 'express';
import fs from 'fs';
import envConfig from 'configuration/envConfig';
import AppRoute from 'types/appRoute';
import notFoundMiddleware from 'middlewares/notFoundMiddleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const ROUTING_DIRS = __dirname.replace('configuration', 'controllers\\');
const ROUTE_PREFIX = `${envConfig('ROUTE_PREFIX')}/`;

fs.readdir(ROUTING_DIRS, async (e, files) => {
  if (e) throw e;

  // eslint-disable-next-line no-restricted-syntax
  for await (const f of files) {
    import(ROUTING_DIRS + f.slice(0, f.indexOf('.'))).then((r: { default: AppRoute }) => app.use(
      `/${ROUTE_PREFIX}${r.default.customPath ?? f.slice(0, f.indexOf('Controller'))}`,
      r.default.router,
    ));
  }

  app.use(notFoundMiddleware);
});

export const PORT = Number(envConfig('PORT'));
export default app;
