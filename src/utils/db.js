import dotenv from 'dotenv';
import log from '@/utils/log';
import mysql from 'mysql'
import { promisify } from 'util'

dotenv.config();

const {
  MYSQL_DATABASE,
  MYSQL_HOST = '127.0.0.1',
  MYSQL_PASSWORD,
  MYSQL_PORT = '3306',
  MYSQL_USER,
} = process.env;

let pool;
try {
  pool = mysql.createPool({
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT,
    user: MYSQL_USER,
  });

  log('database pool established', 'success');
} catch (err) {
  console.error(err);
  log('database pool unable to be established', 'error');
}

pool.getConnection = promisify(pool.getConnection);

class PoolConnection {

  /**
   * Perform a query on the db
   *
   * @param {string} query A MySQL query.
   * @return {Promise<Object[]|Error>} Resolves with an array of results or rejects with an Error.
   *
   * @see https://github.com/mysqljs/mysql#error-handling
   *
   * @example
   *
   *   const results = connection.query('SELECT * FROM clients');
   *
   */
  async query (query) {
    await this._getConnection();
    return this.connection.query(query);
  }

  /**
   * Escape a query to prevent SQL injection, then query the db.
   *
   * @see https://github.com/mysqljs/sqlstring
   *
   * @param {string} query A MySQL query, with ? where replacements should be made.
   * @param {string[]} [replacements] An array of replacements to make.
   * @return {Promise<Object[]|Error>} Resolves with an array of results or rejects with an Error.
   *
   * @see https://github.com/mysqljs/mysql#error-handling
   *
   * @example
   *
   *   const results = connection.execute(
   *     'SELECT * FROM ?? WHERE SHOPIFY_STORE_URL LIKE ?',
   *     [ 'clients', `${client_name}` ],
   *   );
   *
   */
  execute (query, replacements = []) {
    query = mysql.format(query, replacements);
    return this.query(query);
  }

  async _getConnection () {
    if (this.connection) return;
    this.connection = await pool.getConnection();
    this.connection.query = promisify(this.connection.query);
  }

  _releaseConnection () {
    if (!this.connection) return;

    this.connection.release();
    delete this.connection;
  }

}

export default function () {
  return function db (req, res, next) {
    req.db = new PoolConnection();

    res.on('close', req.db._releaseConnection.bind(req.db));
    res.on('finish', req.db._releaseConnection.bind(req.db));

    next();
  }
}
