import { bot } from './bot';
import * as commandHandlers from './handlers/commands';
import * as dataHandlers from './handlers/data';

const handlers = [
  ...Object.values(commandHandlers),
  ...Object.values(dataHandlers),
];

handlers.forEach((handler) => handler(bot));

export { bot, handlers };
