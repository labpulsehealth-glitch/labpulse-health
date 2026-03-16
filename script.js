document.addEventListener("DOMContentLoaded", function(){

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
    }

    // Show home page by default
    showSection("home");

    // LAB DATABASE
    let labs = [
        {
            name:"Ace-Biomed Laboratories",
            test:"general diagnostics",
            price:"₦varies",
            location:"No 99, New-Lagos Road, Benin City, Edo State",
            phone:["08178119012","08178119013","08178119015"],
            email:"clientservice@acebiomedlab.com.ng",
            website:"https://www.acebiomedlab.com.ng",
            mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!...replace_with_embed_link..." 
        },
        {
            name:"Alpha Diagnostics", test:"malaria", price:"₦3500", location:"Ogun"
        }
    ];

    // LAB SEARCH
    window.findLabs = function(){
        let input = document.getElementById("searchInput").value.toLowerCase();
        let results = "";
        labs.forEach(function(lab){
            if(lab.test && lab.test.toLowerCase().includes(input) || lab.name.toLowerCase().includes(input)){
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
                    <a href='https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(lab.location) + "' target='_blank'>Get Directions</a>
                </div>
                `;
            }
        });
        if(results === "") results="<p>No labs found</p>";
        document.getElementById("labResults").innerHTML = results;
    }

    // UPLOAD LAB RESULT
    window.uploadReport = function(){
        let file = document.getElementById("fileUpload").files[0];
        if(file){
            let li = document.createElement("li");
            li.textContent = file.name;
            document.getElementById("recordList").appendChild(li);
            document.getElementById("uploadMessage").innerText="Upload successful!";
        } else {
            document.getElementById("uploadMessage").innerText="Select a file";
        }
    }

});
function interpretResult(){

let test = document.getElementById("testName").value.toLowerCase();
let value = document.getElementById("testValue").value;

let result = "";

if(test === "hemoglobin"){

if(value < 12){
result = "Your hemoglobin appears low. This may suggest anemia. Consider consulting a doctor.";
}

else if(value >= 12 && value <= 16){
result = "Your hemoglobin is within the normal range.";
}

else{
result = "Your hemoglobin appears high. It may be good to discuss this with a healthcare professional.";
}

}

else if(test === "glucose"){

if(value < 70){
result = "Your blood glucose seems low. Please consult a doctor if you feel symptoms.";
}

else if(value <= 100){
result = "Your glucose level appears normal.";
}

else{
result = "Your glucose level is elevated. Consider medical advice.";
}

}

else{
result = "This test is not yet in the database. Please consult a healthcare professional.";
}

document.getElementById("aiResult").innerText = result;

}
function showTestInfo(type){

let info="";

if(type==="blood"){
info="Blood analysis includes tests like hemoglobin, glucose, and white blood cell count. Doctors use these to check anemia, infections, and general health.";
}

else if(type==="microscope"){
info="Microscope testing is used to examine samples like blood, urine, or stool for parasites, bacteria, or abnormal cells.";
}

else if(type==="culture"){
info="Culture tests help identify bacteria or fungi causing infections so doctors can choose the right treatment.";
}

else if(type==="sample"){
info="Sample collection involves taking blood, urine, or other body samples for laboratory testing.";
}

else if(type==="dna"){
info="Genetic testing analyzes DNA to detect inherited conditions or mutations.";
}

else if(type==="report"){
info="Digital lab reports allow patients to safely store and access their medical test results anytime.";
}

let box = document.getElementById("testInfo");
box.innerText = info;
box.classList.add("show");
document.querySelector(".ai-box").scrollIntoView({behavior:"smooth"});

}
