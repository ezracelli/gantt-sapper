import dotenv from 'dotenv';
import log from '@/utils/log';
import redis from 'redis';
import session from 'express-session';

dotenv.config();

const {
  REDIS_HOST = '127.0.0.1',
  REDIS_PORT = 6379,
  SESSION_SECRET = 'keyboard cat',
} = process.env;

const RedisStore = require('connect-redis')(session);

export default function () {
  try {
    const client = redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });

    client
      .on('connect', () => log('redis connection established', 'success'))
      .on('error', (err) => {
        log('redis connection unable to be established', 'error')
        throw err;
      });

    const store = new RedisStore({
      client,
      host: REDIS_HOST,
      port: REDIS_PORT,
    });

    return session({
      cookie: {
        maxAge: 604800000,
      },
      resave: false,
      rolling: true,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      store,
    });
  } catch (err) {
    console.error(err);
    log('redis connection unable to be established', 'error');
  }
}
