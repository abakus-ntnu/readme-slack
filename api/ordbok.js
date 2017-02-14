import express from 'express';
import cheerio from 'cheerio';
import request from 'request';

const router = new express.Router();

router.post('/', (req, res) => {
  const url = `http://ordbok.uib.no/perl/ordbok.cgi?OPP=${req.body.text.replace(' ', '+')}`;

  request.get(url, (rq, rs) => {
    const $ = cheerio.load(rs.body);

    const t = $('.tydingC').first();
    const l = t.children().map((i, el) => $(el).text()).get().join('');
    return res.json({
      response_type: 'in_channel',
      text: `*${req.body.text}*\n${t.text().replace(l, '').trim()}\n${url}`,
    });
  });
});

export default router;
