import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyADqV1RW55ZHNX_AZWXj_liVvg-ptylRO8',
  authDomain: 'dkm-chat.firebaseapp.com',
  databaseURL: 'https://dkm-chat-default-rtdb.firebaseio.com',
  projectId: 'dkm-chat',
  storageBucket: 'dkm-chat.appspot.com',
  messagingSenderId: '442712611101',
  appId: '1:442712611101:web:652cb5832d00de8a58a9f4',
  measurementId: 'G-1JPCZKFK41',
}

const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storageRef = app.storage().ref()

export const usersRef = db.collection('users')
export const roomsRef = db.collection('chatRooms')
export const messagesRef = roomId => roomsRef.doc(roomId).collection('messages')

export const filesRef = storageRef.child('files')

export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const deleteDbField = firebase.firestore.FieldValue.delete()
