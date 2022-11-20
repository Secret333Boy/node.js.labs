import Router, { HTTP_METHODS } from '../lib/Router';
import send from '../lib/send';

const router = new Router();

router.add(HTTP_METHODS.GET, '/ping', (_req, res) => {
  send(res, { message: 'pong' }, 'json');
});

router.get('/superping', (_req, res) => {
  send(res, { message: 'superpong' }, 'json');
});

router.post('/superping', (_req, res, payload) => {
  send(res, { payload }, 'json');
});

router.get('/nested/route/supersuperping', (_req, res) => {
  send(res, { message: 'Supersuperpong' }, 'json');
});

export default router;
