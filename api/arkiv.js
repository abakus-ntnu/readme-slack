import express from 'express';

const router = new express.Router();

router.post('/', (req, res) => {
  const url = `http://arkiv.abakus.no/${req.body.text.replace(' ', '+')}`;
  return res.json({
    response_type: 'in_channel',
    text: url,
  });
});

export default router;
