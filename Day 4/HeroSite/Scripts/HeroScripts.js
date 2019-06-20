let HeroData = {};

function cleanString(inputString) { 
    // Function Splits Strings Into Words Based On Capitals, Then Ensures Each Word Starts With
    // A Capital Letter (e.g. 'thisSetOfWords' to 'This Set Of Words')
    let SplitString = [];
    SplitString = (inputString).split(/([A-Z])/g);
    inputString = "";
    for (StringPiece of SplitString) {
        if ((/[A-Z]/g).test(StringPiece)) {
            inputString += " " + StringPiece;
        }
        else {
            inputString += StringPiece;
        }
    }
    inputString = inputString.replace(/\b\w/g, txt => txt.toUpperCase());
    return inputString;
}

function updateMainDetails() {
    for (let data in HeroData) {
        if (data != "members") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "teamDetail";
            thisDetail.innerText = data;
            thisDetail.innerText += ": ";
            thisDetail.innerText += HeroData[data];

            thisDetail.innerText = cleanString(thisDetail.innerText);

            document.getElementById("js_team_details").appendChild(thisDetail);
        }
    }
}

function updateMemberDetails() {
    let memberNumber = 0;
    for (let data in HeroData) {
        if (data == "members") {

            for (let subData of HeroData[data]) {
                let thisMember = document.createElement("div");
                thisMember.className = "card";

                let thisHeroName = document.createElement("button");
                thisHeroName.className = "btn btn-link";
                thisHeroName.setAttribute("type", "button");
                thisHeroName.setAttribute("data-toggle", "collapse");
                thisHeroName.setAttribute("data-target", "#collapse" + toString(memberNumber));
                thisHeroName.setAttribute("aria-expended", "true");
                thisHeroName.setAttribute("aria-controls", "collapse" + toString(memberNumber));
                thisHeroName.innerText = cleanString(subData["name"]);

                let thisHeroNameH2 = document.createElement("h2");
                thisHeroNameH2.className = "mb-0";
                thisHeroNameH2.append(thisHeroName);

                let thisHeroHeader = document.createElement("div");
                thisHeroHeader.className = "card-header";
                thisHeroHeader.id = "heading" + toString(memberNumber);
                thisHeroHeader.append(thisHeroNameH2);


                for (let memDetail in subData) {
                    if (memDetail != "name") {
                        let thisDetail = document.createElement("p");
                        thisDetail.className = "heroDetail"
                        thisDetail.innerText = memDetail;
                        thisDetail.innerText += ": ";
                        thisDetail.innerText += subData[memDetail];
                        thisDetail.innerText = cleanString(thisDetail.innerText);
                        thisMember.appendChild(thisDetail);
                    }
                }
                document.getElementById("js_member_details").appendChild(thisMember);
                memberNumber++;
            }
        }
    }
}

function updateWithDetails() {
    document.getElementById("js_hero_team_name").innerText = cleanString(HeroData["squadName"]);
    updateMainDetails();
    updateMemberDetails();
}

function loadAPI() {
    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        HeroData = JSON.parse(DataRequest.responseText);
        console.log(HeroData);
        updateWithDetails();
    }

    DataRequest.open("GET", "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/example.json");
    DataRequest.send();
}
