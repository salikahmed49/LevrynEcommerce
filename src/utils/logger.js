const isProd = process.env.NODE_ENV === 'production';

export const logger = {
  log: (...args) => { if (!isProd) console.log(...args); },
  info: (...args) => { if (!isProd) console.info(...args); },
  warn: (...args) => { if (!isProd) console.warn(...args); },
  error: (...args) => { if (!isProd) console.error(...args); },
};

export default logger;
