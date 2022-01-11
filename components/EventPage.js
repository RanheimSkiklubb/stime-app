import React, {useState, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import Event from './Event';
import firestore from '@react-native-firebase/firestore';
import * as _ from 'lodash';

const EventPage = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const ref = firestore().collection('events');



  console.log('Props injected: ', navigation);

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
        const sorted_participants = _.sortBy(participants, [p => p.startNumber]);
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

      console.log('Participants fetched: ', list);
      setEvents(_.orderBy(list, ['startTime'], ['desc']));

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <FlatList
        style={{flex: 1}}
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Event {...item} />}
      />
    </>
  );
};

export default EventPage;
