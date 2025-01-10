import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello dev' });
  return;
});

export default routes;
