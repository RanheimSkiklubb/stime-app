import {createContext} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';

dayjs.locale('nb');
export const TimeContext: React.Context<string> = createContext(
  dayjs().format('HH:mm:ss'),
);
