import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// import {
//   REACT_NATIVE_FIREBASE_IOS_CLIENT_ID,
//   REACT_NATIVE_FIREBASE_IOS_APP_ID,
//   REACT_NATIVE_FIREBASE_IOS_API_KEY,
//   REACT_NATIVE_FIREBASE_ANDROID_CLIENT_ID,
//   REACT_NATIVE_FIREBASE_ANDROID_APP_ID,
//   REACT_NATIVE_FIREBASE_ANDROID_API_KEY,
//   REACT_NATIVE_FIREBASE_DATABASE_URL,
//   REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
//   REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_NATIVE_FIREBASE_PROJECT_ID,
// } from 'react-native-dotenv';

// const iosConfig = {
//   clientId: REACT_NATIVE_FIREBASE_IOS_CLIENT_ID,
//   appId: REACT_NATIVE_FIREBASE_IOS_APP_ID,
//   apiKey: REACT_NATIVE_FIREBASE_IOS_API_KEY,
//   databaseURL: REACT_NATIVE_FIREBASE_DATABASE_URL,
//   storageBucket: REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
//   projectId: REACT_NATIVE_FIREBASE_PROJECT_ID,
//   persistence: true,
// };
//
// // pluck values from your `google-services.json` file you created on the firebase console
// const androidConfig = {
//   clientId: REACT_NATIVE_FIREBASE_ANDROID_CLIENT_ID,
//   appId: REACT_NATIVE_FIREBASE_ANDROID_APP_ID,
//   apiKey: REACT_NATIVE_FIREBASE_ANDROID_API_KEY,
//   databaseURL: REACT_NATIVE_FIREBASE_DATABASE_URL,
//   storageBucket: REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
//   projectId: REACT_NATIVE_FIREBASE_PROJECT_ID,
//   persistence: true,
// };

const iosConfig = {
  clientId:
    '1000170959257-gj4ufmbhp61r6qq32chsvmncqb5701os.apps.googleusercontent.com',
  appId: '1:1000170959257:ios:97091e727e17f89d83e308',
  apiKey: 'AIzaSyBlsRyJQ14VwClAm6ATO559qJUdTnXtq54',
  databaseURL: 'https://simple-race-timer-dev.firebaseio.com',
  storageBucket: 'simple-race-timer-dev.appspot.com',
  messagingSenderId: '1000170959257',
  projectId: 'simple-race-timer-dev',
  persistence: true,
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
  clientId:
    '1000170959257-9nct8qnuflp08i8jg649ecodl54ba4j7.apps.googleusercontent.com',
  appId: '1:1000170959257:android:728b6edd9f9461a183e308',
  apiKey: 'AIzaSyAZ-cU8aniJsZJJZLyIX5qmKs5Pv7LCWvE',
  databaseURL: 'https://simple-race-timer-dev.firebaseio.com',
  storageBucket: 'simple-race-timer-dev.appspot.com',
  messagingSenderId: '1000170959257',
  projectId: 'simple-race-timer-dev',
  persistence: true,
};

const config = Platform.OS === 'ios' ? iosConfig : androidConfig;

// const Firebase = firebase.initializeApp(
//   Platform.OS === 'ios' ? iosConfig : androidConfig,
//   'stime',
// )
// .then(app => console.log('initialized apps ->', firebase.apps));
//
// export default Firebase;

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
