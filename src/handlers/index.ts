import startHandler from './start-handler';
import { Context } from 'telegraf';

const handlers: Record<string, (ctx: Context) => Promise<void>> = {
  start: startHandler,
};

export { handlers, startHandler };
