import {StyleSheet} from 'react-native';
import BaseText from '../atoms/BaseText';

const styles = StyleSheet.create({
  time: {
    fontSize: 170,
    fontWeight: 'bold',
    lineHeight: 200,
  },
});

export default function Time(props) {
  return <BaseText style={styles.time}>{props.time}</BaseText>;
}
