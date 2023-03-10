/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import EventPage from './components/pages/EventPage';
import StarterPage from './components/pages/StarterPage';
import MenuPage from './components/pages/MenuPage';
import TimerPage from './components/pages/TimerPage';
import SpeakerPage from './components/pages/SpeakerPage';
import AboutPage from './components/pages/AboutPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Image, Text} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';
import useInterval from './components/hooks/useInterval';
import {TimeContext} from './components/contexts/TimeContext';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  dayjs.locale('nb');
  let second = dayjs().second();
  const [time, setTime] = useState('00:00:00');

  const run = () => {
    const currentTime = dayjs();
    const currentSecond = currentTime.second();
    if (currentSecond !== second) {
      tick(currentTime);
      second = currentSecond;
    }
  };

  const tick = (t: Dayjs) => {
    const formattedTime = t.format('HH:mm:ss');
    setTime(formattedTime);
  };

  useInterval(run, 100);

  return (
    <TimeContext.Provider value={time}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Events"
          screenOptions={{
            headerStyle: {backgroundColor: 'white'},
            headerTitle: (
              {children}, // App Logo
            ) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  //justifyContent: 'center',
                }}>
                <Image
                  style={{height: 40, width: 40, marginHorizontal: 20}}
                  source={require('./images/stime-icon-circular.png')}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {children}
                </Text>
              </View>
            ),
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 48,
              fontWeight: 'bold',
              color: 'darkblue',
            },
          }}>
          <Stack.Screen
            name="Events"
            component={EventPage}
            options={{title: 'Events'}}
          />
          <Stack.Screen
            name="Menu"
            component={MenuPage}
            options={{title: 'Meny'}}
          />
          <Stack.Screen
            name="Starter"
            component={StarterPage}
            options={{title: 'Starter'}}
          />
          <Stack.Screen
            name="Timer"
            component={TimerPage}
            options={{title: 'Tidtaking'}}
          />
          <Stack.Screen
            name="Speaker"
            component={SpeakerPage}
            options={{title: 'Speaker'}}
          />
          <Stack.Screen
            name="About"
            component={AboutPage}
            options={{title: 'Om oss'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TimeContext.Provider>
  );
}

export default App;
