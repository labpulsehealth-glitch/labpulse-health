import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
document.addEventListener("DOMContentLoaded", function() {

  // ---------- PAGE NAVIGATION ----------
  window.showSection = function(section) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(function(page) {
      page.style.display = "none";
    });
    let activePage = document.getElementById(section);
    if(activePage) {
      activePage.style.display = "block";
    }
  }

  // Show home page by default
  showSection("home");

  // ---------- LAB DATABASE ----------
  let labs = [
    {
      name: "Ace-Biomed Laboratories",
      test: "general diagnostics",
      price: "₦varies",
      location: "No 99, New-Lagos Road, Benin City, Edo State",
      phone: ["08178119012","08178119013","08178119015"],
      email: "clientservice@acebiomedlab.com.ng",
      website: "https://www.acebiomedlab.com.ng",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!...replace_with_embed_link..."
    },
    {
      name: "Alpha Diagnostics",
      test: "malaria",
      price: "₦3500",
      location: "Ogun"
    }
  ];

  // ---------- LAB SEARCH ----------
  window.findLabs = function() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let results = "";
    labs.forEach(function(lab) {
      if((lab.test && lab.test.toLowerCase().includes(input)) || lab.name.toLowerCase().includes(input)) {
        results += `
          <div class="lab-card">
            <h3>${lab.name}</h3>
            <p><b>Tests:</b> ${lab.test || "Various"}</p>
            <p><b>Price:</b> ${lab.price || "Varies"}</p>
            <p><b>Location:</b> ${lab.location || "Not specified"}</p>
            ${lab.phone ? "<p><b>Phone:</b> " + lab.phone.join(", ") + "</p>" : ""}
            ${lab.email ? "<p><b>Email:</b> " + lab.email + "</p>" : ""}
            ${lab.website ? "<p><b>Website:</b> <a href='" + lab.website + "' target='_blank'>" + lab.website + "</a></p>" : ""}
            ${lab.mapEmbed ? "<iframe src='" + lab.mapEmbed + "' width='100%' height='200' style='border:0;' allowfullscreen='' loading='lazy'></iframe>" : ""}
            <a href='https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(lab.location)}' target='_blank'>Get Directions</a>
          </div>
        `;
      }
    });
    if(results === "") results = "<p>No labs found</p>";
    document.getElementById("labResults").innerHTML = results;
  }

  // ---------- UPLOAD LAB RESULT ----------
  window.uploadReport = function() {
    let file = document.getElementById("fileUpload").files[0];
    if(file) {
      let li = document.createElement("li");
      li.textContent = file.name;
      document.getElementById("recordList").appendChild(li);
      document.getElementById("uploadMessage").innerText = "Upload successful!";
    } else {
      document.getElementById("uploadMessage").innerText = "Select a file";
    }
  }

});

// ---------- AI INTERPRETER ----------
function interpretResult() {
  let test = document.getElementById("testName").value.toLowerCase();
  let value = document.getElementById("testValue").value;
  let result = "";

  if(test === "hemoglobin") {
    if(value < 12) result = "Your hemoglobin appears low. This may suggest anemia. Consider consulting a doctor.";
    else if(value <= 16) result = "Your hemoglobin is within the normal range.";
    else result = "Your hemoglobin appears high. Consider discussing this with a healthcare professional.";
  }
  else if(test === "glucose") {
    if(value < 70) result = "Your blood glucose seems low. Please consult a doctor if you feel symptoms.";
    else if(value <= 100) result = "Your glucose level appears normal.";
    else result = "Your glucose level is elevated. Consider medical advice.";
  }
  else {
    result = "This test is not yet in the database. Please consult a healthcare professional.";
  }

  document.getElementById("aiResult").innerText = result;
}

// ---------- EQUIPMENT POPUP ----------
function showTestInfo(type) {
  let title = "", text = "", icon = "";

  switch(type) {
    case "blood":
      title = "Blood Analysis";
      text = "Blood analysis includes tests like hemoglobin, glucose, and white blood cell count. Doctors use these to check anemia, infections, and general health.";
      icon = "🧪";
      break;
    case "microscope":
      title = "Microscope Testing";
      text = "Microscope testing examines samples like blood, urine, or stool for parasites, bacteria, or abnormal cells.";
      icon = "🔬";
      break;
    case "culture":
      title = "Culture & Microbiology";
      text = "Culture tests identify bacteria or fungi causing infections so doctors can choose the right treatment.";
      icon = "🧫";
      break;
    case "sample":
      title = "Sample Collection";
      text = "Sample collection involves taking blood, urine, or other samples for lab testing.";
      icon = "💉";
      break;
    case "dna":
      title = "Genetic Testing";
      text = "Genetic testing analyzes DNA to detect inherited conditions or mutations.";
      icon = "🧬";
      break;
    case "report":
      title = "Digital Lab Reports";
      text = "Digital lab reports allow patients to safely store and access their medical test results anytime.";
      icon = "🧾";
      break;
  }

// POPUP FUNCTIONS
function openPopup(title, text, icon){
  document.getElementById("popupTitle").innerText = title;
  document.getElementById("popupText").innerText = text;
  document.getElementById("popupIcon").innerText = icon;
  document.getElementById("popup").style.display = "flex";
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}
// SIGN UP
window.signUp = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(window.auth, email, password)
    .then(() => {
      document.getElementById("authMsg").innerText = "Account created!";
    })
    .catch((error) => {
      document.getElementById("authMsg").innerText = error.message;
    });
};

// LOGIN
window.login = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(window.auth, email, password)
    .then(() => {
      document.getElementById("authMsg").innerText = "Login successful!";
    })
    .catch((error) => {
      document.getElementById("authMsg").innerText = error.message;
    });
};
  import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
  window.saveResult = async function(test, value) {
  try {
    await addDoc(collection(window.db, "results"), {
      test: test,
      value: value,
      date: new Date()
    });

    alert("Saved successfully!");
  } catch (error) {
    alert(error.message);
  }
};
