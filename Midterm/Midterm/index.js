const GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;

const v = new GlobalKeyboardListener();

// Log every key that's pressed.
v.addListener(function (e, down) {
    // Remove "[VK]" from the key's information.
    const keyInfo = `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP"}`;

    // Log the key's information.
    console.clear(); // Clear the console to overwrite the previous line.
    console.log(keyInfo);
});

// Capture Windows + Space on Windows and Command + Space on Mac
v.addListener(function (e, down) {
    if (
        e.state == "DOWN" &&
        e.name == "SPACE" &&
        (down["LEFT META"] || down["RIGHT META"])
    ) {
        // Call your function
        return true;
    }
});

// Capture ALT + F
v.addListener(function (e, down) {
    if (e.state == "DOWN" && e.name == "F" && (down["LEFT ALT"] || down["RIGHT ALT"])) {
        // Call your function
        return true;
    }
});

// Call one listener only once (demonstrating removeListener())
calledOnce = function (e) {
    console.log("only called once");
    v.removeListener(calledOnce);
};
v.addListener(calledOnce);


const activeWindow = require('active-win');

let currentWindowTitle = ""; // Store the title of the currently active window/tab

// Function to update the active window information
async function updateActiveWindowInfo() {
    try {
        const windowInfo = await activeWindow();
        const newWindowTitle = windowInfo.title;

        if (newWindowTitle !== currentWindowTitle) {
            // The user has changed tabs or windows, update the information
            console.clear(); // Clear the console to update the output
            console.log("Active Window:", newWindowTitle);

            // Update the current window title
            currentWindowTitle = newWindowTitle;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Set an interval to periodically check the active window
const interval = 1000; // Check every 1 second
setInterval(updateActiveWindowInfo, interval);
