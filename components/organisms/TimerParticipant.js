import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import BaseText from '../atoms/BaseText';
import _ from 'lodash';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  col: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 0,
  },
  text: {
    fontSize: 32,
    lineHeight: 55,
    marginHorizontal: 10,
    color: 'white',
  },
  name: {
    textAlign: 'left',
  },
  registerButton: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#556cd6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#556cd6',
  },
  registerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default function TimerParticipant({
  id,
  firstName,
  lastName,
  startNumber,
  startTime,
  save,
}) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <View key={startNumber}r style={styles.row}>
      <View style={styles.col}>
        <View style={styles.row}>
          <BaseText style={styles.text}>
            {_.padStart(startNumber, 3, ' ')}
          </BaseText>
          <BaseText style={styles.text}>
            {fullName.length > 30 ? firstName : fullName}
          </BaseText>
        </View>
      </View>
      <View style={styles.row}>
        <BaseText style={styles.text}>{startTime}</BaseText>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            save({id, startNumber, firstName, lastName, startTime})
          }
          underlayColor="#556cd6">
          <Text style={styles.registerText}>Passering</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
