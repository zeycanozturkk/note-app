import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDuw3CIFiVDvh4jDyKw_dDEH8kjGrXH0XA",
    authDomain: "noteapp-13a15.firebaseapp.com",
    databaseURL: "https://noteapp-13a15-default-rtdb.firebaseio.com",
    projectId: "noteapp-13a15",
    storageBucket: "noteapp-13a15.appspot.com",
    messagingSenderId: "453717032614",
    appId: "1:453717032614:web:5eb5f834f88fbc0fc2fe67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
//modal windows
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('#openModalBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');

const openSignBtn = document.querySelector('#openSignBtn');
const openLogBtn = document.querySelector('#openLogBtn');
const closeSignBtn = document.querySelector('#closeSignBtn');
const closeLogBtn = document.querySelector('#closeLogBtn');
const modalSignIn = document.querySelector('#signInModal');
const LogInModal = document.querySelector('#LogInModal');

//firts modal screen sign in and log in button

openModalBtn.addEventListener('click', function(){
    modal.style.display = 'block';
    modalSignIn.style.display = 'none';
    LogInModal.style.display = 'none';
});

closeModalBtn.addEventListener('click', function(){
    modal.style.display = 'none';
});

//second modal screen for sign in form and log in form

openSignBtn.addEventListener('click', function(){
    modalSignIn.style.display = 'block';
    modal.style.display = 'none';
    LogInModal.style.display = 'none';
});
openLogBtn.addEventListener('click', function(){
    LogInModal.style.display = 'block';
    modal.style.display = 'none';
    modalSignIn.style.display = 'none';
});
closeSignBtn.addEventListener('click', function(){
    modalSignIn.style.display = 'none';
});
closeLogBtn.addEventListener('click', function(){
    LogInModal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    } else if (event.target === modalSignIn) {
        modalSignIn.style.display = 'none';
    }
    else if (event.target === LogInModal) {
        LogInModal.style.display = 'none';
    }
});
//not oluşturma part
const notesContainer = document.querySelector('.note-container')
const addNoteButton = document.querySelector('.add-note');
let notes = document.querySelectorAll('.note');


addNoteButton.addEventListener('click', () => {
    let textBox = document.createElement('p');
    textBox.className = 'note';
    textBox.setAttribute('contenteditable', 'true');
    notesContainer.appendChild(textBox);
});




//form etkinleştirme part
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit");
    
    submitButton.addEventListener("click", function () {
        signup();
    });
});
function signup() {
    firstname = document.querySelector('.firstname').value;
    lastname = document.querySelector('.lastname').value;
    email = document.querySelector('.email').value;
    username = document.querySelector('.uname').value;
    password = document.querySelector('.password').value;

    if (!validate_email(email) == false || !validate_password(password) == false) {
        alert('Email or password is outta line')
        return
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            username: username,
        }
        await setDoc(userRef, userData);
        

        alert('User created');
    })
    .catch(function(error){
        let error_code = error.code
        let error_message = error.message
    
        alert(error_message);
    });
}
function validate_email (email) {
 expression = /^[^@]+@\w+(\.\w+)+\w$/;
 return expression.test(email);
}
function validate_password(password) {
   return password.length >= 6;
}


