// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
    getAuth,  
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import  {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2kcO1KJWnuLj69LTeasm3oq2SmdbN2GM",
    authDomain: "crwn-clothing-db-1fedb.firebaseapp.com",
    projectId: "crwn-clothing-db-1fedb",
    storageBucket: "crwn-clothing-db-1fedb.appspot.com",
    messagingSenderId: "264975625262",
    appId: "1:264975625262:web:6eeec5b49f3adc017f03bf"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;

  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // Exit function is either value is null. 
    if (!email || !password) return; 
    //return value after authentication.
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    // Exit function is either value is null. 
    if (!email || !password) return; 
    //return value after authentication.
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);
