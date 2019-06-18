let userdata = {}

function handleSubmit(formData) {
    // Force Order Of First & Last Names To Be At Start Of List For Better Reading/Searching Later
    userdata["First Name"] = document.getElementById("First Name").value;
    userdata["Last Name"] = document.getElementById("Last Name").value;

    for (let control of formData) {
        if (control.id != "SubmitButton" && control.id != "First Name" && control.id != "Last Name") {
            userdata[control.id] = control.value;                            
        }
    }
    console.log(userdata);
    formData.reset();

    sessionStorage.setItem("userData", JSON.stringify(userdata));
    window.location = "ConfirmationPage.html";
    return false;
}

function displayUsername(){
    let UserName = "";                                                    

    userdata = JSON.parse(sessionStorage.getItem("userData"));
    UserName += userdata["FirstName"];
    UserName += " ";
    UserName += userdata["LastName"];

    document.getElementById("UserName").innerText = UserName;
}

function displayDetails(){
    userdata = JSON.parse(sessionStorage.getItem("userData"));
    for (let key in userdata){
        let thisDetail = document.createElement("p");
        thisDetail.innerText = key;
        thisDetail.innerText += ": ";
        thisDetail.innerText += userdata[key];
        document.getElementById("Details").appendChild(thisDetail);
    }
}