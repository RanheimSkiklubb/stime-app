import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import SpeakerParticipant from '../organisms/SpeakerParticipant';
import Time from '../organisms/Time';
import {sortBy, isEmpty} from 'lodash';
import firestore from '@react-native-firebase/firestore';
import {TimeContext} from '../contexts/TimeContext';
import dayjs from 'dayjs';

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

const SpeakerPage = ({route, navigation}) => {
  const [eventId, setEventId] = useState(route.params.eventId);
  const [event, setEvent] = useState(route.params.event);
  const time = useContext(TimeContext);

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
    }
  }, [event]);

  return event && !isEmpty(event.participants) ? (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Time time={time} />
      </View>
      <FlatList
        data={event.participants}
        keyExtractor={item => item.startNumber}
        renderItem={({item}) => <SpeakerParticipant {...item} />}
      />
    </View>
  ) : (
    <View style={styles.container} />
  );
};
export default SpeakerPage;