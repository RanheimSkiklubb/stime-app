import {Context, createContext} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';

dayjs.locale('nb');
export const TimeContext: Context<string> = createContext(
  dayjs().format('HH:mm:ss'),
);
