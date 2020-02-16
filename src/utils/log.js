const STYLES = {
  BOLD: '\x1b[1m',
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m',
}

const CHARS = {
  ERROR: '>',
  SUCCESS: '✔',
}

export default function log (string, type = 'message') {
  const message = (
    (type !== 'message' && STYLES.BOLD) +
    (type === 'error' ? (STYLES.RED + CHARS.ERROR + ' ') : '') +
    (type === 'success' ? (STYLES.GREEN + CHARS.SUCCESS + ' ') : '') +
    string +
    STYLES.RESET
  );

  console[type === 'error' ? 'error' : 'log'](message);
}
