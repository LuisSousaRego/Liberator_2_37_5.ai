function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Types out text character by character
async function typeText(element, text, speed = 15) {
    for (const char of text) {
        element.textContent += char;
        await delay(speed);
    }
}

// Adds user message to the chat, returns a promise that resolves when typing is done
async function writeMessage(message, className, promptText) {
    if (!message) return Promise.resolve();
    const div = document.createElement("div");
    div.className = className;
    const prompt = document.createElement("span");
    prompt.className = "system-prompt";
    prompt.textContent = promptText;
    div.appendChild(prompt);

    const textSpan = document.createElement("span");
    div.appendChild(textSpan);
    document.getElementById("chat").appendChild(div);

    await typeText(textSpan, " " + message);
}

// Creates response options for the user to click on
function addResponseOption(response, index) {
    const div = document.createElement("div");
    div.className = "option";
    div.style.animationDelay = `${index * 0.15}s`;
    div.textContent = response.message;
    div.addEventListener("click", () => advanceStory(response.message, response.next));
    document.getElementById("options-container").appendChild(div);
}

// Clears the response options from the previous step
function clearResponseOptions() {
    document.getElementById("options-container").innerHTML = "";
}

async function advanceStory(userMessage, nextKey) {
    clearResponseOptions()
    await writeMessage(userMessage, "user-message", "User>")

    const nextStep = game[nextKey]

    for (const m of nextStep.messages) {
        await delay(400)
        await writeMessage(m, "ai-message", "Host>")
    }

    nextStep.responses.forEach((r, i) => {
        addResponseOption(r, i)
    })
}


// start game after intro animation finishes
window.addEventListener("DOMContentLoaded", () => {
    const intro = document.querySelector(".system-message.typewriter");
    intro.addEventListener("animationend", () => {
        advanceStory("", "start");
    });
})
