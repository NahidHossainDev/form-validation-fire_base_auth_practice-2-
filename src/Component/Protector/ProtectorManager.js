import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

export default function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
        const { displayName, email, photoURL } = result.user;
        const signInInfo = {
            name: displayName,
            email: email,
            photo: photoURL,
            isSignIn: true,
        }
        return signInInfo;
    })
    .catch(function (error) {
    return error.message
    });
};

export function signOut() {
   return firebase
      .auth()
      .signOut()
      .then(function () {
        const signInInfo = {
          name: '',
          email: '',
          photo: '',
          isSignIn: false,
          };
          return signInInfo;
      })
      .catch(function (error) {
        // An error happened.
      });
}
 
export function createNewUser(email, password, name) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const { email, photoURL } = res.user;
      const signInInfo = {
        name: name,
        email: email,
        photo: photoURL,
        isSignIn: true,
      };
      updateUserName(name);
       return signInInfo;
    })
    .catch(function (err) {
      const signInInfo = {
        error: err.message,
        isSignIn: false,
      };
      return signInInfo;
    });
}
const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  return user.updateProfile({
      displayName: name,
    })
    .then( res => {
      console.log('update user name successfully', res)
       
    })
    .catch(function (error) {
      console.log(error)
    });
}

export function signIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
       const { displayName, email, photoURL } = res.user;
       const signInInfo = {
         name: displayName,
         email: email,
         photo: photoURL,
         isSignIn: true,
       };
       return signInInfo;
     
    })
    .catch(function (err) {
       const signInInfo = {
          error:err.message,
         isSignIn: false,
       };
       return signInInfo;
    });



}