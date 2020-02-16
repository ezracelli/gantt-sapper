require('date-format-lite')

export async function get (req, res) {
  try {
    const links = await req.db.execute('SELECT * from gantt_links')
    const tasks = await req.db.execute('SELECT * from gantt_tasks ORDER BY sortorder ASC')

    res.send({
      data: tasks.map(task => {
        task.start_date = task.start_date.date('YYYY-MM-DD hh:mm:ss')
        task.open = true

        return task
      }),
      collections: { links },
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ action: 'error' })
  }
}
