import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import Time from '../organisms/Time';
import First from '../organisms/First';
import {
  sortBy,
  head,
  tail,
  take,
  takeWhile,
  union,
  difference,
  isEmpty,
} from 'lodash';
import useInterval from '../hooks/useInterval';
import StarterParticipant from '../organisms/StarterParticipant';
import firestore from '@react-native-firebase/firestore';
import {TimeContext} from '../contexts/TimeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#023abd',
    padding: 10,
  },
  first: {
    backgroundColor: '#023abd',
  },
  clock: {},
  text: {
    color: 'white',
  },
});

const StarterPage = ({route, navigation}) => {
  dayjs.locale('nb');
  dayjs.extend(customParseFormat);
  let timerID = null;
  let initialTime = dayjs();
  let second = initialTime.second();
  const [eventId, setEventId] = useState(route.params.event.id);
  const [event, setEvent] = useState(route.params.event);
  //const [time, setTime] = useState('00:00:00');
  const [first, setFirst] = useState([]);
  const [timeToGo, setTimeToGo] = useState(0);
  const [next, setNext] = useState([]);
  const time = useContext(TimeContext);

  const findStarting = notStarted => {
    const initial = !isEmpty(notStarted)
      ? head(notStarted)
      : {
          startNumber: '',
          startTime: '',
          firstName: 'No more',
          lastName: 'participants.',
        };
    const rest = !isEmpty(notStarted) ? tail(notStarted) : [];
    const others = takeWhile(
      rest,
      participant => participant.startTime == initial.startTime,
    );
    const starting = union([initial], others);
    const remaining = difference(notStarted, starting);
    return [starting, remaining];
  };

  useEffect(() => {
    firestore()
      .doc(`events/${eventId}`)
      .onSnapshot(documentSnapshot => {
        const arr = documentSnapshot.data();
        if (!isEmpty(arr)) {
          arr.participants = sortBy(arr.participants, [p => p.startNumber]);
          setEvent(arr);
        }
      });
  });

  useEffect(() => {
    const title = `Starter - ${dayjs(event.startTime.toDate()).format(
      'DD.MM.YYYY',
    )}: ${event.name} - ${event.eventType}`;
    navigation.setOptions({title: title});
    const [starting, remaining] = findStarting(event.participants);
    setFirst(starting);
    setNext(remaining);
  }, [event, navigation]);

  const secondsToGo = (now, startTime) => {
    if (now && startTime) {
      const start = dayjs(startTime, 'HH:mm:ss');
      return start.diff(now, 'seconds');
    } else {
      return -1;
    }
  };

  useEffect(() => {
    const currentTime = dayjs(time, 'HH:mm:ss');
    const participants = event.participants.filter(participant =>
      dayjs(participant.startTime, 'HH:mm:ss').isAfter(currentTime),
    );
    let secToGo = 0;
    const filtered = takeWhile(participants, participant =>
      dayjs(participant.startTime, 'HH:mm:ss').isAfter(currentTime),
    );
    if (!isEmpty(filtered)) {
      const [starting, remaining] = findStarting(filtered);
      secToGo = secondsToGo(currentTime, head(starting).startTime);
      setFirst(starting);
      setNext(remaining);
    } else {
      setFirst([
        {
          startNumber: '',
          startTime: '',
          firstName: 'No more',
          lastName: 'participants.',
        },
      ]);
      setNext([]);
    }
    setTimeToGo(secToGo);
  }, [time, event]);
  //console.log('Event: ', event);
  return isEmpty(event.participants) ? (
    <View style={styles.container} />
  ) : (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Event id: {event.id}</Text>
      <View style={styles.clock}>
        <Time time={time} />
      </View>
      <ScrollView style={styles.first}>
        {first.map(participant => (
          <First item={participant} timeToGo={timeToGo} />
        ))}
      </ScrollView>
      <ScrollView>
        {next.map(participant => (
          <StarterParticipant {...participant} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StarterPage;
