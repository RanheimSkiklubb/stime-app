import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import Event from '../organisms/Event';
import firestore from '@react-native-firebase/firestore';
import firebase from '../Firebase';
import * as _ from 'lodash';

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
  list: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#023abd',
    padding: 10,
  },
  clock: {},
  text: {
    color: 'white',
  },
});

const EventPage = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const ref = firestore().collection('events');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {
          name,
          eventType,
          description,
          startTime,
          startListGenerated,
          startListPublished,
          participants,
        } = doc.data();
        const sorted_participants = _.sortBy(participants, [
          p => p.startNumber,
        ]);
        list.push({
          id: doc.id,
          name,
          eventType,
          description,
          startTime,
          startListGenerated,
          startListPublished,
          participants: sorted_participants,
        });
      });

      setEvents(_.orderBy(list, ['startTime'], ['desc']));

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Event {...item} />}
      />
    </View>
  );
};

export default EventPage;
