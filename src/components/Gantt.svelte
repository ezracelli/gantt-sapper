<div id="gantt"></div>

<script>

  import Gantt from '@/utils/Gantt';
  import { onMount } from 'svelte';

  onMount(async () => {
    /* global gantt */
    await import('dhtmlx-gantt');

    new Gantt(gantt, '#gantt', {
      columns: [
        {
          name: 'text',
          tree: true,
          width: '*',
          resize: true,
          editor: Gantt.textEditor,
        },
        { name: 'start_date', align: 'center', resize: true, editor: Gantt.dateEditor },
        { name: 'duration', align: 'center', editor: Gantt.durationEditor },
        { name: 'add', width: 44 },
      ],
      date_format: '%Y-%m-%d %H:%i:%s',
      order_branch: true,
      order_branch_free: true,
    }).init();
  });
</script>

<style global lang="scss">
  @import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';

  #gantt {
    bottom: 2em;
    left: 2em;
    position: absolute !important;
    right: 2em;
    top: 2em;

    .gantt_container {
      font-family: inherit;
    }

    .gantt_grid .gantt_grid_scale .gantt_grid_head_cell,
    .gantt_task .gantt_task_scale .gantt_scale_cell {
      text-transform: none;
    }

    .gantt_data_area .gantt_task_row.last_row,
    .gantt_grid_data .gantt_row.last_row {
      border-bottom: 1px solid #d7d7d7;
    }
  }
</style>
