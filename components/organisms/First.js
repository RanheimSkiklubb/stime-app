import {StyleSheet, View} from 'react-native';
import BaseText from '../atoms/BaseText';
import * as _ from 'lodash';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 0,
  },
  textView: {
  },
  text: {
    color: 'lightgreen',
    fontSize: 42,
    //lineHeight: 50,
  },
  timeView: {
    marginRight: 5,
  },
  time: {
    color: 'lightgreen',
    fontSize: 42,
    //lineHeight: 50,
  },
  remaining: {
    color: 'red',
    fontSize: 42,
    //lineHeight: 50,
  },
});

export default function First(props) {
  const {startNumber, startTime, firstName, lastName} = props.item;
  const {timeToGo} = props;
  const name = `${firstName} ${lastName}`;
  const remainStyle = timeToGo > 5 ? styles.time : styles.remaining;
  const remaining = () => {
    if (timeToGo > 300) {
      return startTime;
    } else if (timeToGo < 0) {
      return 0;
    } else {
      return timeToGo;
    }
  }
  return (
    <View style={styles.view} key={startNumber}>
      <View style={styles.textView}>
        <BaseText style={styles.text}>
          {_.padStart(startNumber, 3, ' ')}{' '}
          {name && name.length > 25 ? firstName : name}
        </BaseText>
      </View>
      <View style={styles.timeView}>
        <BaseText style={remainStyle}>{remaining()}</BaseText>
      </View>
    </View>
  );
}
