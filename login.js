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

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const spinner = document.getElementById("loadingSpinner");

function showError(message) {
    errorMessage.innerText = message;
    errorMessage.classList.remove("d-none");
}

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    errorMessage.classList.add("d-none");
    spinner.style.display = "block";

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("✅ Login berjaya:", user.email);

            // Semakan email admin
            if (user.email.toLowerCase() === "admintapin@gmail.com") {
                window.location.href = "dashboard.html";
            } else {
                auth.signOut();
                showError("Akses hanya untuk admin.");
            }
        })
        .catch((error) => {
            console.error("❌ Login gagal:", error.code, error.message);

            if (
                error.code === "auth/invalid-login-credentials" ||
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                showError("Email atau kata laluan salah. Sila cuba lagi.");
            } else {
                showError("Ralat sistem: " + error.message);
            }
        })
        .finally(() => {
            spinner.style.display = "none";
        });
});
