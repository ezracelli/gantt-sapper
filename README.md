# gantt-sapper

[dhtmlx-gantt](https://github.com/DHTMLX/gantt) integrated with [svelte](https://github.com/sveltejs/svelte) + [sapper](https://github.com/sveltejs/sapper)

## database setup

> See the official [dhtmlxGantt tutorial](https://docs.dhtmlx.com/gantt/desktop__howtostart_nodejs.html) for more details

```sql
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  `sortorder` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
```

## `.env` with defaults

```env
# api variables

API_PASSWORD=

# mysql variables

MYSQL_DATABASE=
MYSQL_HOST=127.0.0.1
MYSQL_PASSWORD=
MYSQL_PORT=3306
MYSQL_USER=

# port

PORT=3000

# redis variables

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# session variables

SESSION_SECRET=keyboard cat
```
