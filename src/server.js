import compression from 'compression';
import db from '@/utils/db';
import express from 'express';
import * as sapper from '@sapper/server';
import session from '@/utils/session';

const { PORT } = process.env;

express()
	.use(
    express.json(),
    express.urlencoded({ extended: true }),
    db(),
    session(),
    (req, res, next) => {
      console.log(
        `[${Date().toLocaleString('en-US').replace(/(?<=(\d{2}:){2}\d{2}).+/, '')}] ` +
        `${req.method} ${req.path} from ${req.get('host')}`
      );

      next();
    },
    (req, res, next) => {
      if (req.session.user === undefined) req.session.user = false;
      next();
    },
		compression({ threshold: 0 }),
    express.static('static'),
		sapper.middleware({
      session: req => ({ user: req.session.user }),
    }),
	)
	.listen(PORT, err => {
		if (err) throw err;
	});
