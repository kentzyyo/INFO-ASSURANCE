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

(async () => {
    try {
        const windowInfo = await activeWindow();
        const formattedInfo = `Title: ${windowInfo.title}, ID: ${windowInfo.id}, Bounds: ${JSON.stringify(windowInfo.bounds)}, Owner: ${windowInfo.owner.name}, URL: ${windowInfo.url}, Memory Usage: ${windowInfo.memoryUsage}`;
        console.log(formattedInfo);
    } catch (error) {
        console.error("Error:", error);
    }
})();



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