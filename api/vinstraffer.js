import express from 'express';
import request from 'request';
import base64 from 'base-64';
import credentials from '../confluence-credentials';

const router = new express.Router();

const fetchVinstraffer = (req, res, pageId) => {
  request({
    url: `https://wiki.abakus.no/rest/api/content/${pageId}`,
    headers: {
      Authorization: `Basic ${base64.encode(`${credentials.username}:${credentials.password}`)}`,
    },
    qs: {
      expand: 'body.storage',
    },
  },
  (err, response, body) => {
    if (err || response.statusCode !== 200) {
      res.json({ text: 'Error fetching info from Confluence' });
      return;
    }

    const parsedBody = JSON.parse(body).body.storage.value;
    const listStartString = '<![CDATA[||Completed||Priority||Locked||CreatedDate||CompletedDate||Assignee||Name||';
    const listStart = parsedBody.indexOf(listStartString) + `${listStartString}\n`.length;
    const listEnd = parsedBody.indexOf(']]></ac:plain-text-body></ac:structured-macro>');

    const rgx = /^.*(\|*){6}\|([^\s]+)(.*)\|$/;

    const attachments = parsedBody.slice(listStart, listEnd)
      .split('\n')
      .filter(line =>
        !req.body.text
        || rgx.exec(line) === null
        || rgx.exec(line)[2].toLowerCase() === req.body.text.toLowerCase())
      .map((line) => {
        const regexResult = rgx.exec(line);
        return regexResult ? {
          text: `${rgx.exec(line)[2]}${rgx.exec(line)[3]}`,
        } : null;
      })
      .filter(Boolean);

    let text = 'Her er alle vinstraffene';
    if (req.body.text && attachments.length === 0) {
      text = `${req.body.text} har ingen vinstraffer`;
    } else if (req.body.text) {
      text = `Her er ${req.body.text} sine vinstraffer`;
    }

    res.json({
      response_type: 'in_channel',
      text,
      attachments,
    });
  });
};

router.post('/', (req, res) =>
   fetchVinstraffer(req, res, '5505145')
);

router.post('/backup', (req, res) =>
   fetchVinstraffer(req, res, '6357255')
);

export default router;
