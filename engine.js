function writeUserMessage(message) {

}

function writeAiMessage(message) {

}

function addResponseOption(responses) {

}

function clearResponseOptions() {

}

function advanceStory(userMessage, nextKey) {
    writeUserMessage(userMessage)

    const nextStep = game[nextKey]

    for (const m of nextStep.messages) {
        writeAiMessage(m)
    }

    clearResponseOptions()

    for (const r of nextStep.responses) {
        addResponseOption(r)
    }
}


// start game
advanceStory("", "start")
