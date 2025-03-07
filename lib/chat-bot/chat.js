const defaultWelcomeMessage = 'Hello! Greetings of the day [Rangam](https://jobs.rangam.com)';
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return '<a target="_blank" href="' + href + '" title="' + title + '">' + text + '</a>';
}
// Function to display the default welcome message
function displayDefaultWelcomeMessage() {
    appendMessage('Chatbot', defaultWelcomeMessage, 0);
}

function myFunction() {
    var userInput = document.getElementById('user-input');
    const userMessage = userInput.value;
    document.getElementById("loader").style.display = "block";
    appendMessage('User', userMessage, 1);
    //console.log(sessionStorage.chatHistory);
    userInput.value = ''; // Clear the input field
    $.ajax({
        //url: 'http://127.0.0.1:8000/api/chatbot/query/',
        url: 'http://arboradmin.talentarbor.com/api/chatbot/query/',
        //url:'http://108.50.204.79:8089/api/chatbot/query/',
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        //header:{"Access-Control-Allow-Origin":"*"},
        data: JSON.stringify(
            {

                "chat_id": "480b8fcf-9f60-4d99-8f3c-88e072f4456b",

                "current_question": userMessage,

                "chat_info": {

                    "name": "Rangam",

                    "Product Type": "Rangam",

                    "Persona": "Job Seeker",

                    "Job Role": ""
                },

                "chat_messages": []
                //JSON.parse(sessionStorage.chatHistory)
            }
        ),
        success: function (response) {
            //const chatbotResponse = response['answer'];
            const chatbotResponse = marked.parse(response['data']['response'], { renderer: renderer });
            appendMessage('Chatbot', chatbotResponse, 1);
            document.getElementById("loader").style.display = "none";
        },
        error: function (error) {
            console.log(error)
            //$("#lds-ring").hide()
        }
    })
};

function appendMessage(sender, message, ishistory) {
    var chatDisplay = document.getElementById('chat-display');
    const messageElement = document.createElement('span');
    messageElement.textContent = `${message}`;
    const messageSender = document.createElement('span');
    messageSender.textContent = `${sender}`;
    messageSender.className += 'visually-hidden';
    const messageSpan = document.createElement('div');
    if (sender == 'Chatbot') {
        messageSpan.className += 'bot';
    }
    else {
        messageSpan.className += 'user';
    }
    messageElement.innerHTML = marked.parse(message, { renderer: renderer });
    messageElement.appendChild(messageSender);
    messageSpan.appendChild(messageElement);
    chatDisplay.appendChild(messageSpan);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    // Update the chat history in local storage
    if (ishistory == 1) {
        updateChatHistory(sender, message);
    }
}

function updateChatHistory(sender, message) {
    // Get the existing chat history from local storage or initialize it as an empty array
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || [];

    // Add the new message to the chat history
    chatHistory.push({ sender, message });
    sessionStorage.removeItem('chatHistory');
    // Save the updated chat history back to local storage
    sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function saveChatToTextFile() {
    const chatMessages = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
    // console.log(chatMessages);
    // Combine chat messages into a single string

    const textArray = chatMessages.map(item => `${item.sender} : ${item.message}`);

    const chatText = textArray.join("\n");

    // Create a Blob (binary large object) from the chat text
    const blob = new Blob([chatText], { type: "text/plain;charset=utf-8" });

    // Use FileSaver.js to trigger a file download
    saveAs(blob, "chat.txt");
}

$(document).ready(function () {
    // Display the default welcome message
    displayDefaultWelcomeMessage();
    // Retrieve and display chat history from local storage
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(entry => {
        appendMessage(entry.sender, entry.message, 0);
    });
});

$(document).ready(function () {
    $(".chatbot-open-icon").click(function () {
        $("#chat-container").show();
        $(".chatbot-open-icon").hide();
    });
    $(".chatbot-minimize").click(function () {
        $("#chat-container").hide();
        $(".chatbot-open-icon").show();
    });

    $("#user-input").keypress(function (event) {
        if (event.keyCode === 13) {
            $("#send-button").click();
        }
    });

});