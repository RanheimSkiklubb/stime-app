import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../../../stylesheets/colors';
import * as fonts from '../../../stylesheets/fonts';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
  },
  itemText: {
    flex: 1,
    ...fonts.EQUINOR_TEXT_STRONG,
    alignSelf: 'flex-start',
    marginLeft: 32,
    paddingTop: 15,
    paddingBottom: 15,
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

const ListItem = ({title, onPress, textStyle, image}) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.rowStyle}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={textStyle}>
        {title}
      </Text>
      <View style={styles.iconContainer}>{image}</View>
    </View>
  </TouchableOpacity>
);

ListItem.propTypes = {
  title: PropTypes.string,
  textStyle: PropTypes.object,
  image: PropTypes.object,
  onPress: PropTypes.func,
};

ListItem.defaultProps = {
  title: 'Your title here.',
  textStyle: styles.itemText,
  image: (
    <Icon
      name="ios-arrow-forward"
      style={styles.icon}
      size={24}
      color={colors.EQ_NAV_ICON}
    />
  ),
  onPress: () => {},
};

export default ListItem;
