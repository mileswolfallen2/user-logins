Yes, I have created the index.html, style.css, and script.js files for you!

Here are the contents of each file:

index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Userbase Authentication Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Userbase Authentication Demo</h1>

        <div id="auth-section">
            <h2>Signup</h2>
            <form id="signup-form">
                <input type="text" id="signup-username" placeholder="Username" required>
                <input type="email" id="signup-email" placeholder="Email (optional)">
                <input type="password" id="signup-password" placeholder="Password" required>
                <button type="submit">Sign Up</button>
                <p id="signup-message" class="message"></p>
            </form>

            <h2>Login</h2>
            <form id="login-form">
                <input type="text" id="login-username" placeholder="Username" required>
                <input type="password" id="login-password" placeholder="Password" required>
                <button type="submit">Log In</button>
                <p id="login-message" class="message"></p>
                <p><a href="#" id="forgot-password-link">Forgot Password?</a></p>
            </form>
        </div>

        <div id="profile-section" style="display: none;">
            <h2>Welcome, <span id="profile-username"></span>!</h2>
            <h3>Your Profile</h3>
            <p><strong>User ID:</strong> <span id="profile-userid"></span></p>
            <p><strong>Email:</strong> <span id="profile-email"></span></p>

            <h3>Update Profile</h3>
            <form id="update-profile-form">
                <label for="new-email">New Email:</label>
                <input type="email" id="new-email" placeholder="Enter new email">
                <button type="submit">Update Email</button>
                <p id="update-profile-message" class="message"></p>
            </form>

            <button id="logout-button">Log Out</button>
        </div>

        <div id="forgot-password-section" style="display: none;">
            <h2>Forgot Password</h2>
            <p>Enter your username to receive a temporary password.</p>
            <form id="forgot-password-form">\
                <input type="text" id="forgot-username" placeholder="Username" required>
                <button type="submit">Send Temporary Password</button>
                <p id="forgot-password-message" class="message"></p>
            </form>
            <p><a href="#" id="back-to-login-link">Back to Login</a></p>
        </div>
    </div>

    <script src="https://unpkg.com/userbase-js@latest/dist/userbase-sdk.umd.js"></script>
    <script src="script.js"></script>
</body>
</html>
style.css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Changed to flex-start to allow content to go higher */
    min-height: 100vh;
    margin: 20px; /* Added margin for better spacing */
    box-sizing: border-box;
}

.container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
}

h1, h2, h3 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

form {
    margin-bottom: 25px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #fafafa;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
}

button:hover {
    background-color: #0056b3;
}

#logout-button {
    background-color: #dc3545;
    margin-top: 20px;
}

#logout-button:hover {
    background-color: #c82333;
}

.message {
    margin-top: 15px;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
}

.message.success {
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
}

.message.error {
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

#profile-section p {
    margin-bottom: 10px;
    padding: 5px 0;
}
script.js
// IMPORTANT: Replace 'YOUR_APP_ID' with your actual Userbase App ID.
// You can find this in your Userbase dashboard.
const APP_ID = 'YOUR_APP_ID'; 

// Initialize Userbase SDK
try {
    userbase.init({ appId: APP_ID });
    console.log('Userbase SDK initialized successfully.');
} catch (e) {
    console.error('Failed to initialize Userbase SDK:', e);
    alert('Failed to initialize Userbase SDK. Check your App ID and console for errors.');
}


// --- DOM Elements ---
const authSection = document.getElementById('auth-section');
const profileSection = document.getElementById('profile-section');
const forgotPasswordSection = document.getElementById('forgot-password-section');

// Signup form
const signupForm = document.getElementById('signup-form');
const signupUsernameInput = document.getElementById('signup-username');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupMessage = document.getElementById('signup-message');

// Login form
const loginForm = document.getElementById('login-form');
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginMessage = document.getElementById('login-message');

// Profile section
const profileUsernameSpan = document.getElementById('profile-username');
const profileUserIdSpan = document.getElementById('profile-userid');
const profileEmailSpan = document.getElementById('profile-email');
const logoutButton = document.getElementById('logout-button');

// Update Profile form
const updateProfileForm = document.getElementById('update-profile-form');
const newEmailInput = document.getElementById('new-email');
const updateProfileMessage = document.getElementById('update-profile-message');

// Forgot password
const forgotPasswordLink = document.getElementById('forgot-password-link');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const forgotUsernameInput = document.getElementById('forgot-username');
const forgotPasswordMessage = document.getElementById('forgot-password-message');
const backToLoginLink = document.getElementById('back-to-login-link');


// --- Helper Functions ---
function displayMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
}

function clearMessages() {
    [signupMessage, loginMessage, updateProfileMessage, forgotPasswordMessage].forEach(el => {
        el.textContent = '';
        el.className = 'message';
    });
}

function showAuthSection() {
    authSection.style.display = 'block';
    profileSection.style.display = 'none';
    forgotPasswordSection.style.display = 'none';
    clearMessages();
    // Clear form fields
    signupForm.reset();
    loginForm.reset();
    forgotPasswordForm.reset();
}

function showProfileSection(user) {
    authSection.style.display = 'none';
    forgotPasswordSection.style.display = 'none';
    profileSection.style.display = 'block';
    clearMessages();
    profileUsernameSpan.textContent = user.username;
    profileUserIdSpan.textContent = user.userId;
    profileEmailSpan.textContent = user.email || 'N/A'; // 'N/A' if email is not set
    newEmailInput.value = user.email || ''; // Pre-fill with current email
}

function showForgotPasswordSection() {
    authSection.style.display = 'none';
    profileSection.style.display = 'none';
    forgotPasswordSection.style.display = 'block';
    clearMessages();
    forgotPasswordForm.reset();
}

// --- Event Handlers ---

// Check if user is already logged in on page load
userbase.getSession()
    .then(session => {
        if (session.user) {
            console.log('User already logged in:', session.user);
            showProfileSection(session.user);
        } else {
            console.log('No active session.');
            showAuthSection();
        }
    })
    .catch(e => {
        console.error('Error getting session:', e);
        showAuthSection(); // Default to auth section on error
    });

// Signup
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    const username = signupUsernameInput.value;
    const password = signupPasswordInput.value;
    const email = signupEmailInput.value || undefined; // Pass undefined if empty for optional email

    try {
        const user = await userbase.signUp({
            username,
            password,
            email, // Email is optional
            profile: {
                // You can add other profile data here if needed
            }
        });
        displayMessage(signupMessage, `Signup successful! Welcome, ${user.username}. You are now logged in.`, 'success');
        showProfileSection(user);
    } catch (e) {
        console.error('Signup failed:', e);
        displayMessage(signupMessage, `Signup failed: ${e.message}`, 'error');
    }
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    try {
        const user = await userbase.signIn({ username, password });
        displayMessage(loginMessage, `Login successful! Welcome, ${user.username}.`, 'success');
        showProfileSection(user);
    } catch (e) {
        console.error('Login failed:', e);
        displayMessage(loginMessage, `Login failed: ${e.message}`, 'error');
    }
});

// Logout
logoutButton.addEventListener('click', async () => {
    clearMessages();
    try {
        await userbase.signOut();
        console.log('Logged out successfully.');
        displayMessage(loginMessage, 'You have been logged out.', 'success');
        showAuthSection();
    } catch (e) {
        console.error('Logout failed:', e);
        displayMessage(updateProfileMessage, `Logout failed: ${e.message}`, 'error');
    }
});

// Update Profile (Email)
updateProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    const newEmail = newEmailInput.value || null; // Userbase expects null to remove email

    try {
        const user = await userbase.updateUser({ email: newEmail });
        displayMessage(updateProfileMessage, 'Profile updated successfully!', 'success');
        showProfileSection(user); // Re-fetch and display updated profile
    } catch (e) {
        console.error('Update profile failed:', e);
        displayMessage(updateProfileMessage, `Update failed: ${e.message}`, 'error');
    }
});

// Forgot Password link
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForgotPasswordSection();
});

// Back to Login link
backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthSection();
});

// Forgot Password form submission
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    const username = forgotUsernameInput.value;

    try {
        await userbase.forgotPassword({ username });
        displayMessage(forgotPasswordMessage, 'A temporary password has been sent to your email address.', 'success');
        forgotPasswordForm.reset();
    } catch (e) {
        console.error('Forgot password failed:', e);
        displayMessage(forgotPasswordMessage, `Forgot password failed: ${e.message}`, 'error');
    }
});

// Listener for session changes (e.g., if a session expires or user logs in/out in another tab)
userbase.onUpdate((session) => {
    if (session.user) {
        console.log('User session updated:', session.user);
        showProfileSection(session.user);
    } else {
        console.log('User session ended.');
        showAuthSection();
    }
});
