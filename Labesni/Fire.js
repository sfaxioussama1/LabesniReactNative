
import firebase from "firebase";
class Fire {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyC9FemRYyjg09dAZ2K6Qf0q_IoKDlLkcUw",
            authDomain: "projetlabesni.firebaseapp.com",
            databaseURL: "https://projetlabesni.firebaseio.com",
            projectId: "projetlabesni",
            storageBucket: "projetlabesni.appspot.com",
            messagingSenderId: "680868658843",
            appId: "1:680868658843:web:2b911e8ad58ed55fea103e",
            measurementId: "G-248T43CJVX"
        };
        firebase.initializeApp(firebaseConfig);

       
    }
    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }

}
Fire.shared = new Fire();
export default Fire;