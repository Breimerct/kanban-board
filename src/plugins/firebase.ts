// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyA2ujKz5Kxjk_wopkFhG4h-2q7QYEE3-W8',
   authDomain: 'kanban-board-bre.firebaseapp.com',
   projectId: 'kanban-board-bre',
   storageBucket: 'kanban-board-bre.appspot.com',
   messagingSenderId: '384541875294',
   appId: '1:384541875294:web:a96348704aeb18a7af68cf'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
