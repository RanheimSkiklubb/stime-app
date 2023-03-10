import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  base: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default function BaseText(props) {
  return <Text style={[styles.base, props.style]}>{props.children}</Text>;
}
