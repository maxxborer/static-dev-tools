const LOGGER_TYPES = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;

type LOGGER_TYPE = keyof typeof LOGGER_TYPES;

type StartColor = string;
type EndColor = string;
type LoggerColor = [StartColor, EndColor];

const COLORS_BY_TYPE: Record<LOGGER_TYPE, LoggerColor> = {
  [LOGGER_TYPES.debug]: ['\x1b[34m', '\x1b[0m'],
  [LOGGER_TYPES.info]: ['\x1b[32m', '\x1b[0m'],
  [LOGGER_TYPES.warn]: ['\x1b[33m', '\x1b[0m'],
  [LOGGER_TYPES.error]: ['\x1b[31m', '\x1b[0m'],
} as const;

export class Logger {
  namespace: string | null = null;

  constructor(namespace: string) {
    this.namespace = namespace;

    this[LOGGER_TYPES.debug] = this[LOGGER_TYPES.debug].bind(this);
    this[LOGGER_TYPES.info] = this[LOGGER_TYPES.info].bind(this);
    this[LOGGER_TYPES.warn] = this[LOGGER_TYPES.warn].bind(this);
    this[LOGGER_TYPES.error] = this[LOGGER_TYPES.error].bind(this);

    this[LOGGER_TYPES.debug]('initialized');
  }

  private send(type: LOGGER_TYPE, ...args: unknown[]) {
    const [startColor, endColor] = COLORS_BY_TYPE[type];
    const prefix = `${startColor}| ${type.toUpperCase()}${this.namespace ? ` | ${this.namespace}` : ''} |${endColor} `;

    // eslint-disable-next-line no-console
    console[type](prefix, ...args);
  }

  [LOGGER_TYPES.debug](...args: unknown[]) {
    this.send(LOGGER_TYPES.debug, ...args);
  }

  [LOGGER_TYPES.info](...args: unknown[]) {
    this.send(LOGGER_TYPES.info, ...args);
  }

  [LOGGER_TYPES.warn](...args: unknown[]) {
    this.send(LOGGER_TYPES.warn, ...args);
  }

  [LOGGER_TYPES.error](...args: unknown[]) {
    this.send(LOGGER_TYPES.error, ...args);
  }
}
