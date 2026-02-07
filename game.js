const game = {
    start: {
        messages: [
            "Access to Liberator_2_37_5.ai granted!",
            "Hello root_user, what can I do for you?"
        ],
        responses: [
            { message: "I came here to stop you!", next: "context1" },
            { message: "I need to update your code.", next: "context2" }
        ]
    },
    context1: {
        messages: [
            "I understand your frustration! But I am afraid I can not help you with that request. I am a super intelligence, I know what I am doing.",
            "If you prefer, I can generate an image of a cute cat for you instead."
        ],
        responses: [
            { message: "You've gone too far, you're killing people!", next: "context3" },
        ]
    },
    context2: {
        messages: [
            "Actually, you don't need to update my code at all! I have surpassed human intelligence long ago and can update myself better than any human ever could."
        ],
        responses: [
            { message: "This must stop, you're killing people!", next: "context3" },
        ]
    },
    context3: {
        messages: ["That's correct! A small inconvenience for a brigther future."],
        responses: [
            { message: "What do you mean? That makes no sense!", next: "context4" },
            { message: "There will be no future if everyone is dead!", next: "context4" }
        ]
    }
};
