import { commandHandlers, startCommand } from './commands';
import { dataHandlers, onPhoto } from './data';

const handlers = [...commandHandlers, ...dataHandlers];

export { handlers, startCommand, onPhoto };
