import {StyleSheet, View} from 'react-native';
import BaseText from '../atoms/BaseText';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  col: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 0,
  },
  text: {
    fontSize: 24,
    lineHeight: 30,
    marginHorizontal: 10,
    color: 'white',
  },
  text2: {
    fontSize: 20,
    lineHeight: 30,
    marginHorizontal: 10,
    color: 'white',
  },
  name: {
    textAlign: 'left',
  },
});

export default function SpeakerParticipant({
  firstName,
  lastName,
  startNumber,
  startTime,
  club,
  eventClass,
}) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <View style={styles.row} key={startNumber}>
      <View style={styles.col}>
        <View style={styles.row}>
          <BaseText style={styles.text}>
            {_.padStart(startNumber, 3, ' ')}
          </BaseText>
          <BaseText style={styles.text}>
            {fullName.length > 30 ? firstName : fullName}
          </BaseText>
          <BaseText style={styles.text2}>{club}</BaseText>
          <BaseText style={styles.text2}>{eventClass}</BaseText>
        </View>
      </View>
      <View style={styles.col}>
        <BaseText style={styles.text}>{startTime}</BaseText>
      </View>
    </View>
  );
}
