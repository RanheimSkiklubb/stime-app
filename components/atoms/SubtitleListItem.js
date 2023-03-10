import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  itemContainerValid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#556cd6',
  },
  itemContainerInvalid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#657E9A',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
  },
  columnStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  itemTextValid: {
    flex: 1,
    fontSize: 16,
    marginLeft: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'white',
  },
  subScriptTextValid: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    marginLeft: 32,
    color: 'white',
  },
  itemTextInvalid: {
    flex: 1,
    fontSize: 16,
    marginLeft: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'lightgray',
  },
  subScriptTextInvalid: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    marginLeft: 32,
    color: 'lightgray',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  icon: {
    marginRight: 40,
  },
});

const SubtitleListItem = ({title, subtitle, onPress, image, valid = true}) => (
  <TouchableOpacity
    style={valid ? styles.itemContainerValid : styles.itemContainerInvalid}
    onPress={onPress}>
    <View style={styles.rowStyle}>
      <View style={styles.columnStyle}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={valid ? styles.itemTextValid : styles.itemTextInvalid}>
          {title}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={
            valid ? styles.subScriptTextValid : styles.subScriptTextInvalid
          }>
          {subtitle}
        </Text>
      </View>
      <View style={styles.iconContainer}>{image}</View>
    </View>
  </TouchableOpacity>
);

SubtitleListItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  image: PropTypes.object,
};

SubtitleListItem.defaultProps = {
  title: 'Your title here',
  subtitle: 'Your subtitle here',
  onPress: () => {},
  image: <Icon name="clear" style={styles.icon} size={24} />,
};

export default SubtitleListItem;
