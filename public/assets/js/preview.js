let messages = [];
let characters = [];
let dialog = [];
let storyTheme = [];

function init(){
    getStoryAutoFill();
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
async function previewEpisode() {
    try {
        let conversationArray = messages[0].data;

        for (element of conversationArray) {
            characters.push(element[0]);
            dialog.push(element[1]);
            
        }
        $.ajax("/api/ChatStories/episode-csv-import", {
            type: "POST",
            data: {characters},
            success:  function(response){
                if (response[0] instanceof Object) {
                    displayUpload(response);
                } else {
                    testModal(response);
                }
                //Reset it here
                characters = [];
             }
        })
    }
    catch (err) {
        console.log(err)
    }
};


function testModal (missingChar) {
    const filteredMissingChar = Array.from(new Set(missingChar));
    for (let i = 0; i < filteredMissingChar.length; i++) {
        const missingCharDiv = document.getElementById('missing-char');
        const text = document.createTextNode(`${filteredMissingChar[i]} needs to be added to the ChatStory.`);
        pChar = document.createElement("p");
        pChar.appendChild(text);
        missingCharDiv.appendChild(pChar);
    }
   
    $('.ui.modal').modal('show');
}

function getStoryAutoFill(err) {
    $.ajax("/api/ChatStories/story-template-theme", {
        type: "GET",
        dataType: 'json',
        // data: storyInfo,
        success: function(response) {
            formAutoFill(response);
            storyTheme.push(response);
        }
    })
    if (err) console.log(err);
}

function formAutoFill(chatStory) {
    const formStoryField = document.getElementById('chatstory-field');
    formStoryField.setAttribute("value", `${chatStory.title}`);
}

function displayUpload(characterStyles) {
    const previewContainer = document.getElementById('preview-texts');
    previewContainer.innerHTML = '';
    previewContainer.setAttribute("style", `color:${storyTheme[0].fgColor};background-color: ${storyTheme[0].bgColor}`)
    for (var i = 0; i < characterStyles.length; i ++) {
        const iconChar = document.createTextNode(characterStyles[i].title.charAt(0));
        const pOne = document.createElement("p");
        pOne.classList.add("initial-icon", `${characterStyles[i].alignment}-iconalignment`);
        pOne.appendChild(iconChar);
        const textMessage = document.createTextNode(dialog[i]);
        const pTwo = document.createElement("p");
        pTwo.appendChild(textMessage);
        pTwo.classList.add(`${characterStyles[i].alignment}-alignment`, `${characterStyles[i].alignment}-bubble`)
        pTwo.setAttribute("style", `color:#${characterStyles[i].textColor};background-color: #${characterStyles[i].bubbleColor}; color: #${characterStyles[i].fgColor}`);

        
        const textChar = document.createTextNode(characterStyles[i].title);
        pThree = document.createElement("p");
        pThree.classList.add("character-name", `${characterStyles[i].alignment}-characterName`);
        pThree.appendChild(textChar);

        
        previewContainer.appendChild(pThree);
        previewContainer.appendChild(pTwo).appendChild(pOne);
    }
    pLast = document.createElement("p");
    previewContainer.appendChild(pLast);

};

const deviceDisplay = document.getElementById('preview-device');

deviceDisplay.onchange = function() {
    const selection = document.getElementById('preview-device').value;
    const previewContainer = document.getElementById('preview-texts');
    switch (selection) {
        case 'iPhone X':
            previewContainer.setAttribute("class", 'ui card iphone-X');
            break;
        case 'iPhone 8':
            previewContainer.setAttribute("class",'ui card iphone-8');
            break;
        case 'Samsung Galaxy S8':
            previewContainer.setAttribute("class", 'ui card android');
            break;
        case 'Google Pixel 2':
            previewContainer.setAttribute("class", 'ui card pixel');
            break;
        default:
            console.log("Default div size");
    }
}

init();