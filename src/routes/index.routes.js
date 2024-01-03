import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.2',
  });
});

export default router;
