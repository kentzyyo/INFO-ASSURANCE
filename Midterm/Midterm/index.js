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



// Group 1 - Keylogger 
// var GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;

// const v = new GlobalKeyboardListener();

// //Log every key that's pressed.
// v.addListener(function (e, down) {
//     console.log(
//         `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`
        
//     );
// })

// //Capture Windows + Space on Windows and Command + Space on Mac
// v.addListener(function (e, down) {
//     if (
//         e.state == "DOWN" &&
//         e.name == "SPACE" &&
//         (down["LEFT META"] || down["RIGHT META"])
//     ) {
//         //call your function
//         return true;
//     }
// });

// //Capture ALT + F
// v.addListener(function (e, down) {
//     if (e.state == "DOWN" && e.name == "F" && (down["LEFT ALT"] || down["RIGHT ALT"])) {
//         //call your function
//         return true;
//     }
// });

// //Call one listener only once (demonstrating removeListener())
// calledOnce = function (e) {
//     console.log("only called once");
//     v.removeListener(calledOnce);
// };
// v.addListener(calledOnce);

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




// const activeWindow = require('active-win');

// (async () => {
// 	console.log(await activeWindow(options)), {
//         title: 'Keyloggers-Group 1',
//         id: 5762,
//         bounds: {
//             x: 0,
//             y: 0,
//             height: 900,
//             width: 1440
//         },
//         owner: {
//             name: 'Google Chrome',
//             processId: 310,
//             bundleId: 'com.google.Chrome',
//             path: '/Applications/Google Chrome.app'
//         },
//         url: 'https://sindresorhus.com/unicorn',
//         memoryUsage: 11015432
//     }});

    /*
To add logging of errors please use. This is hopefully not needed in most cases, but may still be useful in production.

new GlobalKeyboardListener({
        windows: {
            onError: (errorCode) => console.error("ERROR: " + errorCode),
            onInfo: (info) => console.info("INFO: " + info)
        },
        mac: {
            onError: (errorCode) => console.error("ERROR: " + errorCode),
        }
    }); 
*/