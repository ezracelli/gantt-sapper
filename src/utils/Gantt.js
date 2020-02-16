class Gantt {
  constructor (gantt, selector, config) {
    this.config = config;
    this.element = document.querySelector(selector);
    this.gantt = gantt;
  }

  _handleGanttRender () {
    [
      this.element.querySelectorAll('.gantt_data_area .gantt_task_row'),
      this.element.querySelectorAll('.gantt_grid_data .gantt_row'),
    ]
      .map(nodeList => Array.from(nodeList || []).slice(-1))
      .flat()
      .filter(Boolean)
      .forEach(el => el.classList.add('last_row'));

    return this;
  }

  init () {
    Object.assign(this.gantt.config, this.config);

    this.gantt.init(document.getElementById('gantt'))
    this.gantt.load('/api/gantt')

    this.dp = new this.gantt.dataProcessor('/api/gantt');
    this.dp.init(this.gantt);
    this.dp.setTransactionMode('REST');

    return this;
  }

  delegateEvents () {
    this.gantt.attachEvent('onGanttRender', this._handleGanttRender);

    return this;
  }
}

Gantt.dateEditor = {
  type: 'date',
  map_to: 'start_date',
  min: new Date(2018, 0, 1),
  max: new Date(2019, 0, 1),
};
Gantt.durationEditor = { type: 'number', map_to: 'duration', min: 0, max: 100 };
Gantt.textEditor = { type: 'text', map_to: 'text' };

export default Gantt;
