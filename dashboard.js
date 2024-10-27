// dashboard.js

// Function to fetch data from the backend
async function fetchConversations() {
    try {
        const response = await fetch('http://localhost:5001/api/get_conversations');
        const data = await response.json();
        populateConversations(data);
    } catch (error) {
        console.error('Error fetching conversations:', error);
    }
}

// Function to populate the messages container
function populateConversations(data) {
    const container = document.getElementById('messages-container');
    container.innerHTML = ''; // Clear existing content

    // Group messages by phone number
    const conversations = {};
    data.forEach(message => {
        const phone = message.phone_number;
        if (!conversations[phone]) {
            conversations[phone] = [];
        }
        conversations[phone].push(message);
    });

    // Convert conversations object to an array and sort by latest message timestamp
    const sortedConversations = Object.values(conversations).sort((a, b) => {
        const latestMessageA = a[a.length - 1];
        const latestMessageB = b[b.length - 1];
        return new Date(latestMessageB.timestamp) - new Date(latestMessageA.timestamp);
    });

    // For each conversation, create a conversation div
    sortedConversations.forEach(conversation => {
        const phone = conversation[0].phone_number;
        const redactedPhone = phone.substring(0, 3) + '*****' + phone.substring(phone.length - 2);

        const conversationDiv = document.createElement('div');
        conversationDiv.classList.add('conversation');

        // Add a header for the conversation
        const conversationHeader = document.createElement('div');
        conversationHeader.classList.add('conversation-header');
        conversationHeader.innerHTML = `
            <h3>${redactedPhone}</h3>
        `;
        conversationDiv.appendChild(conversationHeader);

        // Create a messages container for the conversation
        const messagesContainer = document.createElement('div');
        messagesContainer.classList.add('conversation-messages');

        // Sort messages within the conversation by timestamp
        conversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        conversation.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');

            const role = message.role; // 'user' or 'assistant'
            const content = message.content;
            const timestamp = new Date(message.timestamp).toLocaleString();

            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="message-role">${role}</span>
                    <span class="message-timestamp">${timestamp}</span>
                </div>
                <div class="message-content">${content}</div>
            `;

            messagesContainer.appendChild(messageDiv);
        });

        conversationDiv.appendChild(messagesContainer);
        container.appendChild(conversationDiv);
    });
}

// Logout function
function logout() {
    window.location.href = 'index.html';
}

// Fetch data when the page loads and set interval for live updates
window.onload = function() {
    fetchConversations();
    // Fetch data every 5 seconds
    setInterval(fetchConversations, 5000);
};
