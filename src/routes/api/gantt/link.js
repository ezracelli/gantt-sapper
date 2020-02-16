require('date-format-lite')

export async function post (req, res) {
  try {
    const { source, target, type } = req.body

    const { insertId: id } = await req.db.execute(`
      INSERT INTO gantt_links(source, target, type)
      VALUES (?,?,?)
    `, [ source, target, type ])

    res.status(201).send({ action: 'inserted', tid: id })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}
