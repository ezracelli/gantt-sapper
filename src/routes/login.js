import dotenv from 'dotenv';

dotenv.config();

export function post (req, res) {
  try {
    if (req.body.password !== process.env.API_PASSWORD) {
      req.session.user = false;
      res.status(401)
    } else req.session.user = true;
  } catch (err) {
    console.error(err);
    res.status(500)
  }

  res.send({ user: req.session.user })
}
