import Router from '../lib/Router.js';
import send from '../lib/send.js';

const router = new Router();

router.add('GET', '/ping', (_req, res) => {
  send(res, { message: 'pong' }, 'json');
});

export default router;
