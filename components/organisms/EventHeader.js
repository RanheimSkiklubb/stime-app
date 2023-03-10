import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import BaseText from '../atoms/BaseText';

const EventHeader = event => {
  dayjs.locale('nb');
  const title = event
    ? `${dayjs(event.startTime.toDate()).format('DD.MM.YYYY')}: ${
        event.name
      } - ${event.eventType}`
    : 'None';

  return <BaseText>{title}</BaseText>;
};

export default EventHeader;
