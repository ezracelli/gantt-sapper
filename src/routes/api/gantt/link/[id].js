require('date-format-lite')

export async function get (req, res) {
  try {
    const [ link ] = await req.db.execute(
      'SELECT * FROM gantt_links WHERE id = ?',
      [ req.params.id ]
    )

    if (link) res.send(link)
    else res.status(404).send({ action: 'error' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}

export async function put (req, res) {
  try {
    const { source, target, type } = req.body

    await req.db.execute(`
      UPDATE gantt_links
      SET source = ?, target = ?, type = ?
      WHERE id = ?
    `, [ source, target, type, req.params.id ])

    res.send({ action: 'updated' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}

export async function del (req, res) {
  try {
    await req.db.execute('DELETE FROM gantt_links WHERE id = ?', [ req.params.id ])

    res.send({ action: 'deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}
