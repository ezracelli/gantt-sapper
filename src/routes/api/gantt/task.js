require('date-format-lite')

export async function post (req, res) {
  try {
    const {
      text,
      start_date,
      duration,
      progress,
      parent,
    } = req.body

    const { maxOrder = 0 } = await req.db.execute(
      'SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks'
    )

    const { insertId: id } = await req.db.execute(`
      INSERT INTO gantt_tasks(text, start_date, duration, progress, parent, sortorder)
      VALUES (?,?,?,?,?,?)
    `, [
      text,
      start_date.date('YYYY-MM-DD'),
      duration,
      progress || 0,
      parent,
      maxOrder + 1,
    ])

    res.status(201).send({ action: 'inserted', tid: id })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}
