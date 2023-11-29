import firebaseApp from './index' // This is the Firebase object from the previous tutorial
import { getAuth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";

const auth = initializeAuth(firebaseApp, {
    persistence: [indexedDBLocalPersistence]
});

export default auth;