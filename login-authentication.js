var config = {
    apiKey: "AIzaSyD8TIvQZ0m7CVuHj7wJobyMVJvWLah4j80",
    authDomain: "test-e11a8.firebaseapp.com",
    databaseURL: "https://test-e11a8.firebaseio.com",
    projectId: "test-e11a8",
    storageBucket: "test-e11a8.appspot.com",
    messagingSenderId: "665883602172"

};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

$(document).ready(function() {

    // Get elements

    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");
    const btnGoogle = $("#btnGoogle");

    // add login event
    $("#btnLogin").on("click", e => {
        // Get email and passwork
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        if ((email == "") || (pass == "")) {
            return false;
        }
        // if (pass == promise) {
        //     $("#txtPassword").empty();
        // }
        //Sign Up
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        // if (pass !== true) {
        //     $("#txtPassword").empty();
        // }
    });
    // Add signup event
    $("#btnSignUp").on("click", e => {
        // TODO: Check for real email
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        if ((email == "") || (pass == "")) {
            return false;
        }
        //Sign Up
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // signout
    $("#btnLogout").on("click", e => {
        firebase.auth().signOut();
    });

    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogout.show();
        } else {
            console.log('not logged in');
            btnLogout.hide();
        }
    });

    var provider = new firebase.auth.GoogleAuthProvider();

    $("#btnGoogle").on("click", e => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    })

})