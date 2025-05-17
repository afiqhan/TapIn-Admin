const firebaseConfig = {
    apiKey: "AIzaSyChNjBJcN5Ig5pXKpitXOUJxzVIn7gXAVA",
    authDomain: "tapin-e798d.firebaseapp.com",
    projectId: "tapin-e798d",
    storageBucket: "tapin-e798d.firebasestorage.app",
    messagingSenderId: "733701309308",
    appId: "1:733701309308:web:1b7896c9c090959e221af9",
    measurementId: "G-RS752LCP07",
    databaseURL: "https://tapin-e798d-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.email === "admintapin@gmail.com") {
                window.location.href = "dashboard.html";
            } else {
                auth.signOut();
                document.getElementById("errorMessage").innerText = "Akses hanya untuk admin.";
            }
        })
        .catch((error) => {
            document.getElementById("errorMessage").innerText = error.message;
        });
});


