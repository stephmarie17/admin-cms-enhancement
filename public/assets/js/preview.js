console.log("CONNECTED");

let messages = [];
let characters = [];
let dialog = [];

function init(){
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('preview').addEventListener('click', previewEpisode);
}

// Upload CSV and get data
function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
    document.getElementById('file').textContent = event.target.result;
    const data = Papa.parse(event.target.result);
    messages.push(data);
}

// Gets relevant data from CSV in order to apply styling for preview
function previewEpisode() {
    let conversationArray = messages[0].data;

    for (element of conversationArray) {
        characters.push(element[0]);
        dialog.push(element[1]);
    }

    displayUpload();
};

function displayUpload() {
    for (var i = 0; i < characters.length; i ++) {
        let pOne = document.createElement("p");
        let textChar = document.createTextNode(characters[i] + ": ");
        pOne.classList.add("initial-icon");
        pOne.appendChild(textChar);
        let pTwo = document.createElement("p");
        let textMessage = document.createTextNode(dialog[i]);
        pTwo.appendChild(textMessage);
        pTwo.setAttribute("style", "background-color: blue");
        document.getElementById('preview-texts').appendChild(pOne);
        document.getElementById('preview-texts').appendChild(pTwo);
    }
};

init();