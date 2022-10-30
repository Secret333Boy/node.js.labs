import http, { Server } from 'http';
import Router from './Router';

export default class {
  private httpServer: Server;
  private router?: Router;

  constructor() {
    this.httpServer = http.createServer();
    return this;
  }

  use(router: Router): this {
    this.router = router;
    return this;
  }

  listen(...params: Parameters<Server['listen']>): void {
    if (!this.router) throw new Error('No router used by server');

    this.httpServer.on('request', this.router.handle.bind(this.router));

    this.httpServer.listen(...params);
  }
}
