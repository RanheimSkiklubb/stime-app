import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import {useNavigation} from '@react-navigation/native';
import EventHeader from '../organisms/EventHeader';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import useInterval from '../hooks/useInterval';
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

const MenuPage = ({route, navigation}) => {
  dayjs.locale('nb');

  const [eventId, setEventId] = useState(route.params.event.id);
  const [event, setEvent] = useState(route.params.event);

  useEffect(() => {
    firestore()
      .doc(`events/${eventId}`)
      .onSnapshot(documentSnapshot => {
        const arr = documentSnapshot.data();
        arr.participants = _.sortBy(arr.participants, [p => p.startNumber]);
        setEvent(arr);
      });
  }, [eventId]);

  useEffect(() => {
    const title = `Meny - ${dayjs(event.startTime.toDate()).format(
      'DD.MM.YYYY',
    )}: ${event.name} - ${event.eventType}`;
    navigation.setOptions({title: title});
  }, [event, navigation]);

  const menuItems = [
    {
      id: 1,
      title: 'Starter',
      icon: <Icon name="flag" size={64} color="white" />,
      page: 'Starter',
    },
    {
      id: 2,
      title: 'Timer',
      icon: <Icon name="timer" size={64} color="white" />,
      page: 'Timer',
    },
    {
      id: 3,
      title: 'Speaker',
      icon: <Icon name="speaker-notes" size={64} color="white" />,
      page: 'Speaker',
    },
    {
      id: 4,
      title: 'About',
      icon: <Icon name="info" size={64} color="white" />,
      page: 'About',
    },
  ];

  const readyToStart =
    event.startListGenerated &&
    dayjs(event.startTime.toDate()).isAfter(dayjs().startOf('day'));

  const open = (item, eventt) => {
    if (readyToStart) {
      navigation.navigate(item.page, {event});
    } else if (item.page == 'About') {
      navigation.navigate(item.page, {event});
    }
  };

  return (
    <View style={styles.container}>
      <EventHeader {...event} />
      <FlatList
        style={styles.list}
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => open(item, event)}>
            <View style={styles.card}>
              {item.icon}
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MenuPage;
