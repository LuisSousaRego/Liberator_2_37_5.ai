// Types out text character by character, returns a promise that resolves when done
function typeText(element, text, speed = 15) {
    return new Promise((resolve) => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Adds user message to the chat, returns a promise that resolves when typing is done
function writeUserMessage(message) {
    if (!message) return Promise.resolve();
    const div = document.createElement("div");
    div.className = "user-message";
    const prompt = document.createElement("span");
    prompt.className = "system-prompt";
    prompt.textContent = "User>";
    div.appendChild(prompt);

    const textSpan = document.createElement("span");
    div.appendChild(textSpan);
    document.getElementById("chat").appendChild(div);

    return typeText(textSpan, " " + message);
}

// Add AI message to the chat, returns a promise that resolves when typing is done
function writeAiMessage(message) {
    const div = document.createElement("div");
    div.className = "ai-message";
    const prompt = document.createElement("span");
    prompt.className = "system-prompt";
    prompt.textContent = "Host>";
    div.appendChild(prompt);

    const textSpan = document.createElement("span");
    div.appendChild(textSpan);
    document.getElementById("chat").appendChild(div);

    return typeText(textSpan, " " + message);
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

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function advanceStory(userMessage, nextKey) {
    clearResponseOptions()
    await writeUserMessage(userMessage)

    const nextStep = game[nextKey]

    for (const m of nextStep.messages) {
        await delay(400)
        await writeAiMessage(m)
    }

    nextStep.responses.forEach((r, i) => {
        addResponseOption(r, i)
    })
}


// start game after intro animation finishes
window.addEventListener("DOMContentLoaded", () => {
    const intro = document.querySelector(".system-message.typewriter");
    intro.addEventListener("animationend", () => {
        intro.classList.add("done");
        advanceStory("", "start");
    });
})
