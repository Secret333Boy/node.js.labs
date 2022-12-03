import Router, { HTTP_METHODS } from '../lib/Router.js';
import send from '../lib/send.js';

const router = new Router();

router.add(HTTP_METHODS.GET, '/ping', async (_req, res) => {
  send(res, { message: 'pong' }, 'json');
});

router.get('/superping', async (_req, res) => {
  send(res, { message: 'superpong' }, 'json');
});

router.post('/superping', async (_req, res, payload) => {
  send(res, { payload }, 'json');
});

router.get('/nested/route/supersuperping', async (_req, res) => {
  send(res, { message: 'Supersuperpong' }, 'json');
});

export default router;
