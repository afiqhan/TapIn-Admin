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
const db = firebase.database();
const auth = firebase.auth();

const tableBody = document.getElementById("attendanceTable");
const searchInput = document.getElementById("searchInput");

// Sekat akses bukan admin
auth.onAuthStateChanged((user) => {
  if (!user || user.email !== "admintapin@gmail.com") {
    window.location.href = "login.html";
  } else {
    loadAttendance();
  }
});

function loadAttendance() {
  db.ref("attendance").once("value", (snapshot) => {
    tableBody.innerHTML = "";
    const data = snapshot.val();
    if (!data) return;

    Object.entries(data).forEach(([uid, records]) => {
      Object.entries(records).forEach(([key, record]) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td id="name-${uid}-${key}">Loading...</td>
          <td>${record.time || "-"}</td>
          <td>${record.type || "-"}</td>
          <td>${record.status || "-"}</td>
          <td>${record.latitude || "-"}</td>
          <td>${record.longitude || "-"}</td>
          <td>${record.working_hours || "-"}</td>
          <td>${record.distance || "-"}</td>
          <td>${record.remark || "-"}</td>
        `;

        tableBody.appendChild(row);

        db.ref("users/" + uid).once("value").then((userSnap) => {
          const name = userSnap.val()?.name || "Unknown";
          document.getElementById(`name-${uid}-${key}`).textContent = name;
        });
      });
    });
  });
}

// Carian nama
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  Array.from(tableBody.children).forEach((row) => {
    const nameCell = row.children[0].textContent.toLowerCase();
    row.style.display = nameCell.includes(keyword) ? "" : "none";
  });
});

function updateSummaryCards() {
  db.ref("users").once("value", (snap) => {
    document.getElementById("userCount").textContent = snap.numChildren();
  });

  db.ref("attendance").once("value", (snap) => {
    let total = 0;
    snap.forEach((userSnap) => {
      total += userSnap.numChildren();
    });
    document.getElementById("recordCount").textContent = total;
  });
}

