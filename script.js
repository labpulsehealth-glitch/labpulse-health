     document.addEventListener("DOMContentLoaded", function () {

  // PAGE NAVIGATION
  window.showSection = function(section){

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page){
      page.style.display = "none";
    });

    let activePage = document.getElementById(section);

    if(activePage){
      activePage.style.display = "block";
    }
  };

  // SHOW HOME FIRST
  showSection("home");

  // LAB DATABASE
  let labs = [
    {
      name:"Ace-Biomed Laboratories",
      test:"general diagnostics",
      price:"₦varies",
      location:"Benin City"
    },

    {
      name:"Alpha Diagnostics",
      test:"malaria",
      price:"₦3500",
      location:"Ogun"
    }
  ];

  // FIND LABS
  window.findLabs = function(){

    let input =
    document.getElementById("searchInput").value.toLowerCase();

    let results = "";

    labs.forEach(function(lab){

      if(
        lab.name.toLowerCase().includes(input) ||
        lab.test.toLowerCase().includes(input)
      ){

        results += `
        <div class="lab-card">

          <h3>${lab.name}</h3>

          <p><b>Tests:</b> ${lab.test}</p>

          <p><b>Price:</b> ${lab.price}</p>

          <p><b>Location:</b> ${lab.location}</p>

        </div>
        `;
      }

    });

    if(results === ""){
      results = "<p>No labs found</p>";
    }

    document.getElementById("labResults").innerHTML = results;
  };

  // UPLOAD REPORT
  window.uploadReport = function(){

    let file =
    document.getElementById("fileUpload").files[0];

    if(file){

      let li = document.createElement("li");

      li.textContent = file.name;

      document.getElementById("recordList")
      .appendChild(li);

      document.getElementById("uploadMessage")
      .innerText = "Upload successful!";

    }

    else{

      document.getElementById("uploadMessage")
      .innerText = "Please select a file";

    }
  };

});


// AI INTERPRETER
function interpretResult(){

  let test =
  document.getElementById("testName")
  .value.toLowerCase();

  let value =
  document.getElementById("testValue").value;

  let result = "";

  if(test === "hemoglobin"){

    if(value < 12){

      result =
      "Your hemoglobin appears low. This may suggest anemia.";

    }

    else if(value <= 16){

      result =
      "Your hemoglobin is within the normal range.";

    }

    else{

      result =
      "Your hemoglobin appears high.";

    }
  }

  else if(test === "glucose"){

    if(value < 70){

      result =
      "Your blood glucose seems low.";

    }

    else if(value <= 100){

      result =
      "Your glucose level appears normal.";

    }

    else{

      result =
      "Your glucose level is elevated.";

    }
  }

  else{

    result =
    "This test is not yet in the database.";

  }

  document.getElementById("aiResult").innerText = result;
}


// POPUP SYSTEM
function openPopup(title, text, icon){

  document.getElementById("popupTitle")
  .innerText = title;

  document.getElementById("popupText")
  .innerText = text;

  document.getElementById("popupIcon")
  .innerText = icon;

  document.getElementById("popup")
  .style.display = "flex";
}


function closePopup(){

  document.getElementById("popup")
  .style.display = "none";

  }
