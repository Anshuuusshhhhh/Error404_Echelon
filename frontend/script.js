document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.querySelector(".chatbot-btn");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const closeBtn = document.querySelector(".close-btn");
    const sidebar = document.querySelector(".sidebar");
    const dashboard = document.querySelector(".dashboard");

    // Open chatbot and adjust UI
    chatbotBtn.addEventListener("click", function () {
        chatbotContainer.style.display = "flex";
        sidebar.classList.add("hidden"); // Hide sidebar
        dashboard.classList.add("chatbot-active"); // Re-align boxes
    });

    // Close chatbot and reset UI
    closeBtn.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
        sidebar.classList.remove("hidden"); // Show sidebar again
        dashboard.classList.remove("chatbot-active"); // Restore grid layout
    });
});
