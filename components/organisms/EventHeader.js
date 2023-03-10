import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import BaseText from '../atoms/BaseText';

const EventHeader = event => {
  dayjs.locale('nb');
  const title = `${dayjs(event.startTime.toDate()).format('DD.MM.YYYY')}: ${
    event.name
  } - ${event.eventType}`;

  return <BaseText>{title}</BaseText>;
};

export default EventHeader;
