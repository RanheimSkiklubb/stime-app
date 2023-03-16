// Not sure this is being used at all. I think the magic happens in the native app code now.

import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {
  REACT_NATIVE_FIREBASE_IOS_CLIENT_ID,
  REACT_NATIVE_FIREBASE_IOS_APP_ID,
  REACT_NATIVE_FIREBASE_IOS_API_KEY,
  REACT_NATIVE_FIREBASE_ANDROID_CLIENT_ID,
  REACT_NATIVE_FIREBASE_ANDROID_APP_ID,
  REACT_NATIVE_FIREBASE_ANDROID_API_KEY,
  REACT_NATIVE_FIREBASE_DATABASE_URL,
  REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  REACT_NATIVE_FIREBASE_PROJECT_ID,
} from 'react-native-dotenv';

const iosConfig = {
  clientId: REACT_NATIVE_FIREBASE_IOS_CLIENT_ID,
  appId: REACT_NATIVE_FIREBASE_IOS_APP_ID,
  apiKey: REACT_NATIVE_FIREBASE_IOS_API_KEY,
  databaseURL: REACT_NATIVE_FIREBASE_DATABASE_URL,
  storageBucket: REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: REACT_NATIVE_FIREBASE_PROJECT_ID,
  persistence: true,
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
  clientId: REACT_NATIVE_FIREBASE_ANDROID_CLIENT_ID,
  appId: REACT_NATIVE_FIREBASE_ANDROID_APP_ID,
  apiKey: REACT_NATIVE_FIREBASE_ANDROID_API_KEY,
  databaseURL: REACT_NATIVE_FIREBASE_DATABASE_URL,
  storageBucket: REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: REACT_NATIVE_FIREBASE_PROJECT_ID,
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
