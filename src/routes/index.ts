import Router, { HTTP_METHODS } from '../lib/Router';
import send from '../lib/send';

const router = new Router();

router.add(HTTP_METHODS.Get, '/ping', (_req, res) => {
  send(res, { message: 'pong' }, 'json');
});

router.get('/superping', (_req, res) => {
  send(res, { message: 'superpong' }, 'json');
});

export default router;
