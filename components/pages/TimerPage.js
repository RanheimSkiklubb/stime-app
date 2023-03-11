import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Time from '../organisms/Time';
import {sortBy, isEmpty} from 'lodash';
import useInterval from '../hooks/useInterval';
import TimerParticipant from '../organisms/TimerParticipant';
import firestore from '@react-native-firebase/firestore';
import {TimeContext} from '../contexts/TimeContext';

const styles = StyleSheet.create({
  heading: {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 120,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#023abd',
    padding: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#556cd6',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
  },
});

const TimerPage = ({route, navigation}) => {
  dayjs.locale('nb');
  dayjs.extend(customParseFormat);

  const [eventId, setEventId] = useState(route.params.eventId);
  const [event, setEvent] = useState(route.params.event);
  const [participants, setParticipants] = useState([]);
  const [started, setStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const time = useContext(TimeContext);

  const hasStarted = evt =>
    event ? dayjs().isAfter(dayjs(evt.startTime.toDate())) : false;

  const registerTime = participant => {
    console.log(
      `Passering for startnummer ${participant.startNumber} på tid ${time}`,
    );
    const newTimes = participant.registeredTimes || [];
    newTimes.push(time);
    participant.registeredTimes = newTimes;
  };

  const initializeParticipants = evt =>
    evt.participants.map(({firstName, lastName, startNumber, startTime}) => ({
      firstName,
      lastName,
      startNumber,
      startTime,
      startDiff: dayjs(startTime, 'HH:mm:ss').diff(
        dayjs(evt.startTime.toDate()),
        'seconds',
      ),
    }));

  const countUp = (startTime, startDiff) => {
    setElapsedSeconds(elapsedSeconds + 1);
    return elapsedSeconds - startDiff;
  };
  const updateParticipants = evt => {
    setParticipants(
      evt.participants.map(
        ({startNumber, firstName, lastName, startTime, startDiff}) => ({
          firstName,
          lastName,
          startNumber,
          startTime: Math.round(countUp(startTime, startDiff) / 60),
          startDiff,
        }),
      ),
    );
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
  }, [eventId]);

  useEffect(() => {
    if (event && event.startTime && !isEmpty(event.participants)) {
      const title = `Tidtaker - ${dayjs(event.startTime.toDate()).format(
        'DD.MM.YYYY',
      )}: ${event.name} - ${event.eventType}`;
      navigation.setOptions({title: title});
      setParticipants(initializeParticipants(event));
    }
  }, [event]);

  useEffect(() => {
    if (!started) {
      setStarted(hasStarted(event));
    } else {
      updateParticipants();
    }
  }, [started, time]);

  return event && !isEmpty(event.participants) ? (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Time time={time} />
      </View>
      <FlatList
        data={event.participants}
        keyExtractor={item => item.startNumber}
        renderItem={({item}) => (
          <TimerParticipant {...item} save={it => registerTime(it)} />
        )}
      />
    </View>
  ) : (
    <View style={styles.container} />
  );
};

export default TimerPage;
