require('date-format-lite')

export async function get (req, res) {
  try {
    const [ task ] = await req.db.execute(
      'SELECT * FROM gantt_tasks WHERE id = ?',
      [ req.params.id ]
    )

    if (task) res.send(task)
    else res.status(404).send({ action: 'error' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}

export async function put (req, res) {
  try {
    let { target = '' } = req.body
    target = target.replace(/^next:/, '');

    let { sortorder = 0 } = await req.db.execute('SELECT * FROM gantt_tasks WHERE id = ?', [ target ])
    if (!isNaN(target)) sortorder++

    await req.db.execute(`
      UPDATE gantt_tasks
      SET sortorder = sortorder + 1
      WHERE sortorder >= ?
    `, [ sortorder ])

    if (!isNaN(target)) {
      await req.db.execute(
        'UPDATE gantt_tasks SET sortorder = ? WHERE id = ?',
        [ sortorder, target ]
      )
    }

    const {
      text,
      start_date,
      duration,
      progress,
      parent
    } = req.body

    await req.db.execute(`
      UPDATE gantt_tasks
      SET text = ?, start_date = ?, duration = ?, progress = ?, parent = ?
      WHERE id = ?
    `, [
      text,
      start_date.date('YYYY-MM-DD'),
      duration,
      progress || 0,
      parent,
      req.params.id,
    ])

    res.send({ action: 'updated' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}

export async function del (req, res) {
  try {
    await req.db.execute('DELETE FROM gantt_tasks WHERE id = ?', [ req.params.id ])

    res.send({ action: 'deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}
