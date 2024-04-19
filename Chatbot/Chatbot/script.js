const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (chatElement, userMessage) => {
    const messageElement = chatElement.querySelector("p");
    
    // Define predefined responses based on user input
    const responses = {
        "hello": "Hi there!",
        "how are you?": "I'm doing well, thank you!",
        "goodbye": "Goodbye!",
        // Add more responses as needed
    };

    // Check if the user's message matches any predefined responses
    let response = "I'm sorry, I don't understand. Can you please rephrase?";
    for (const key in responses) {
        if (userMessage.toLowerCase().includes(key)) {
            response = responses[key];
            break;
        }
    }

    // Update the chatbox with the response
    chatbox.appendChild(createChatLi(response, "incoming"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    const userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // Display "Thinking..." message while waiting for the response
    const thinkingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(thinkingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Generate and display bot response
        generateResponse(thinkingChatLi, userMessage);
        // Hide the "Thinking..." message
        chatbox.removeChild(thinkingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
