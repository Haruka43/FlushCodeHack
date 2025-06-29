import * as winston from 'winston';

import { LOG_FILE_PATH, LOG_TIMESTAMP_FORMAT } from '@/constants';
import type { LogGroup } from '@/schema/log';

const { format, transports } = winston;
const loggers: { [key: string]: winston.Logger } = {};

export const getLogger = ({
  group,
  gameId,
  round,
  playerName,
}: {
  group: LogGroup;
  gameId?: string;
  round?: number; // geme log
  playerName?: string;
}) => {
  try {
    let loggerName = '';
    if (group === 'application')
      loggerName = gameId ? `${group}_${gameId}` : group;
    if (group === 'game') loggerName = `${group}_${gameId}`;
    if (group === 'player') loggerName = `${group}_${gameId}_${playerName}`;
    if (group === 'point') loggerName = `${group}_${gameId}`;

    switch (group) {
      case 'game':
        loggers[loggerName] = winston.createLogger({
          level: 'info',
          transports: [
            new transports.Console({
              format: format.combine(
                format.timestamp({ format: LOG_TIMESTAMP_FORMAT }),
                format.prettyPrint(),
                format.printf(({ timestamp, message }) =>
                  JSON.stringify({ ...message, timestamp })
                ),
                format.colorize({ all: true })
              ),
            }),
            new transports.File({
              filename: `${LOG_FILE_PATH}/${gameId}/game/${round}.log`,
              format: format.printf(({ message }) =>
                JSON.stringify({
                  ...message,
                  createdAt: Date.now(),
                })
              ),
            }),
          ],
        });
        break;
      case 'point':
        loggers[loggerName] = winston.createLogger({
          level: 'info',
          transports: [
            new transports.File({
              filename: `${LOG_FILE_PATH}/${gameId}/point.csv`,
              format: format.printf(({ message }) => message),
            }),
          ],
        });
        break;
      case 'player':
        loggers[loggerName] = winston.createLogger({
          level: 'debug',
          transports: [
            new transports.Console({
              format: format.combine(
                format.timestamp({ format: LOG_TIMESTAMP_FORMAT }),
                format.prettyPrint(),
                format.printf(
                  ({ level, timestamp, message }) =>
                    `${timestamp}: player-${playerName} [${level.toUpperCase()}] - ${message}`
                ),
                format.colorize({ all: true })
              ),
            }),
            new transports.File({
              filename: `${LOG_FILE_PATH}/${gameId}/player/${playerName}.log`,
              format: format.combine(
                format.timestamp({
                  format: LOG_TIMESTAMP_FORMAT,
                }),
                format.prettyPrint(),
                format.printf(
                  ({ level, timestamp, message }) =>
                    `${timestamp}: [${level.toUpperCase()}] - ${message}`
                )
              ),
            }),
          ],
        });
        break;
      default:
        loggers[loggerName] = winston.createLogger({
          level: 'debug',
          transports: [
            new transports.Console({
              format: format.combine(
                format.timestamp({ format: LOG_TIMESTAMP_FORMAT }),
                format.prettyPrint(),
                format.printf(
                  ({ level, timestamp, message }) =>
                    `${timestamp}: application [${level.toUpperCase()}] - ${message}`
                ),
                format.colorize({ all: true })
              ),
            }),
            new transports.File({
              filename: `${LOG_FILE_PATH}/${
                gameId ?? 'common'
              }/application.log`,
              format: format.combine(
                format.timestamp({
                  format: LOG_TIMESTAMP_FORMAT,
                }),
                format.prettyPrint(),
                format.printf(
                  ({ level, timestamp, message }) =>
                    `${timestamp}: [${level.toUpperCase()}] - ${message}`
                )
              ),
            }),
          ],
        });
        break;
    }

    return loggers[loggerName];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return null;
  }
};
