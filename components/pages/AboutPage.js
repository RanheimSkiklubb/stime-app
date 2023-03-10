import {View, StyleSheet, Text, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    color: 'white',
  },
  sectionDescription: {
    marginTop: 8,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#023abd',
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#556cd6',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuText: {
    color: 'white',
  },
});

const AboutPage = ({route}) => {
  const tidtakere = [
    {name: 'Øyvind Rønne'},
    {name: 'Tor Erik Rabben'},
    {name: 'Jørn Ølmheim'},
  ];

  return (
    <View style={styles.container}>
      <Image
        style={{width: 600, marginHorizontal: 20}}
        source={require('../../images/ranheim-skiklubb-logo.png')}
        resizeMode="contain"
      />
      <Text style={styles.sectionTitle}>
        Laget og publisert av tidtakergruppen i Ranheim skiklubb
      </Text>
      <FlatList
        style={styles.sectionContainer}
        data={tidtakere}
        renderItem={({item}) => {
          return (
            <View style={{marginBottom: 10}}>
              <Text style={styles.sectionTitle}>{`\u2022 ${item.name}`}</Text>
            </View>
          );
        }}
      />
      <View style={styles.row}>
        <Icon name="copyright" size={32} color="white" />
        <Text style={styles.sectionDescription}>2023 - Ranheim Skiklubb</Text>
      </View>
    </View>
  );
};

export default AboutPage;
