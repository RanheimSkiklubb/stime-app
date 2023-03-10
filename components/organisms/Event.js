import SubtitleListItem from '../atoms/SubtitleListItem';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Event = event => {
  dayjs.locale('nb');
  const navigation = useNavigation();
  const startTime = dayjs(event.startTime.toDate());

  const readyToStart =
    event.startListGenerated && startTime.isAfter(dayjs().startOf('day'));

  const title = `${event.name} - ${event.eventType}`;
  //console.log('Start time: ', startTime, startTime.locale());
  return (
    <SubtitleListItem
      image={
        readyToStart ? (
          <Icon name="list" size={30} color="white" />
        ) : (
          <Icon name="error" size={30} color="lightgray" />
        )
      }
      title={title}
      valid={readyToStart}
      subtitle={dayjs(event.startTime.toDate()).format('D MMMM YYYY HH:mm')}
      onPress={() => navigation.navigate('Menu', {event})}
    />
  );
};

export default Event;
