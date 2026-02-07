// Adds user message to the chat
function writeUserMessage(message) {
    if (!message) return;
    const div = document.createElement("div");
    div.className = "user-message";
    div.innerHTML = `<span class="system-prompt">User></span> ${message}`;
    document.getElementById("chat").appendChild(div);
}

// Add AI message to the chat
function writeAiMessage(message) {
    const div = document.createElement("div");
    div.className = "ai-message";
    div.innerHTML = `<span class="system-prompt">Host></span> ${message}`;
    document.getElementById("chat").appendChild(div);
}

// Creates response options for the user to click on
function addResponseOption(response) {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = response.message;
    div.addEventListener("click", () => advanceStory(response.message, response.next));
    document.getElementById("options-container").appendChild(div);
}

// Clears the response options from the previous step
function clearResponseOptions() {
    document.getElementById("options-container").innerHTML = "";
}

function advanceStory(userMessage, nextKey) {
    clearResponseOptions()
    writeUserMessage(userMessage)

    const nextStep = game[nextKey]

    for (const m of nextStep.messages) {
        writeAiMessage(m)
    }


    for (const r of nextStep.responses) {
        addResponseOption(r)
    }
}


// start game
window.addEventListener("DOMContentLoaded", () => advanceStory("", "start"))
