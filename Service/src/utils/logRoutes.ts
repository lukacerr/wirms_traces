import express from 'express';

export default (app: express.Express) => {
  function split(thing: any) {
    if (typeof thing === 'string') {
      return thing.split('/');
    } if (thing.fast_slash) {
      return '';
    }
    const match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : `<complex:${thing.toString()}>`;
  }

  function print(path: any, layer: any) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    } else if (layer.method) {
      console.log(
        '%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'),
      );
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  app._router.stack.forEach(print.bind(null, []));
};
