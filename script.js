// Observer class to show notifications
class NotificationObserver {
    update(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerText = message;

        // Add notification to the page
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Subject class to manage observers and send notifications
class NotificationSubject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}

// Global instance of the subject (notification manager)
const notificationManager = new NotificationSubject();

// Create an instance of the observer
const notificationObserver = new NotificationObserver();

// Add the observer to the subject
notificationManager.addObserver(notificationObserver);

// Example login function
function login() {
    // Simulate login success
    const loginSuccessful = true; // Replace with actual login logic
    if (loginSuccessful) {
        // Store notification in localStorage (if redirection is needed)
        localStorage.setItem('notification', 'You have logged into your account!');
        // Redirect to home page (or another page)
        window.location.href = 'index.html'; // Adjust URL as needed
    }
}

// Show notification on page load if present
document.addEventListener('DOMContentLoaded', () => {
    const message = localStorage.getItem('notification');
    if (message) {
        notificationManager.notifyObservers(message);
        // Clear the notification to avoid repeat messages
        localStorage.removeItem('notification');
    }
});

// Example: Call login function on button click
document.getElementById('loginButton')?.addEventListener('click', login);


// Updated sign-in function to use observer pattern
function signIn(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === 'success') {
                // Save notification message in local storage
                localStorage.setItem('notification', 'You have logged into your account!');
                // Redirect to homepage
                window.location.href = '/index.html';
            } else {
                document.getElementById('message').innerText = data;
                document.getElementById('message').style.color = 'red';
            }
        })
        .catch((error) => console.error('Error:', error));
}

// Listen for when the DOM is loaded on the homepage
window.addEventListener('DOMContentLoaded', () => {
    const message = localStorage.getItem('notification');
    if (message) {
        // Display the notification
        loginNotifier.notifyObservers(message);
        // Clear the notification from local storage
        localStorage.removeItem('notification');
    }
});


// Sign-up function
function signUp(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve user inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = 'Please enter a valid email address.';
    messageElement.style.color = 'red';
    return; // Exit if email is invalid
  }
  // Password length validation (minimum 6 characters)
  if (password.length < 6) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = 'Password must be at least 6 characters long.';
    messageElement.style.color = 'red';
    return; // Exit if password is too short
}

    // Post data to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then((response) => response.text())
        .then((data) => {
            const messageElement = document.getElementById('message');
            if (data === 'Account made successfully! You can now login.') {
                // If success, show the success message in green
                messageElement.innerText = data;
                messageElement.style.color = 'green';
                // Optional: Reset form inputs
                document.getElementById('signupForm').reset();
            } else {
                // Handle any error message from the server
                messageElement.innerText = data;
                messageElement.style.color = 'red';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            const messageElement = document.getElementById('message');
            messageElement.innerText = 'Server error. Please try again later.';
            messageElement.style.color = 'red';
        });
}
// New validateEmail function (this was missing)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// New setupLoginHandler function (this was missing)
function setupLoginHandler() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const emailInput = document.getElementById('emailInput');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = emailInput.value;
        
        // Validate email
        if (!validateEmail(email)) {
            loginMessage.textContent = 'Please enter a valid email address.';
            loginMessage.className = 'message error-message';
        } else {
            loginMessage.textContent = 'Email is valid.';
            loginMessage.className = 'message success-message';
        }
    });
}
module.exports = { validateEmail, setupLoginHandler };


/* Export the functions for testing (if needed)
module.exports = { validateEmail, setupLoginHandler };*/

function setupPasswordValidationHandler() {
    const form = document.getElementById('signinForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const messageElement = document.getElementById('message');
        
        if (password.length < 6) {
            messageElement.innerText = 'Password must be at least 6 characters long.';
            messageElement.style.color = 'red';
            return false;
        } else {
            messageElement.innerText = '';
            messageElement.style.color = '';
            return true;
        }
    });
}

console.log(setupPasswordValidationHandler); 



document.addEventListener('DOMContentLoaded', function () {
    // Handle the doctor form
    const doctorForm = document.getElementById('doctorForm');
    if (doctorForm) {
        doctorForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            // Collect form data
            const data = {
                username: document.getElementById('username').value,
                hospital_name: document.getElementById('hospital_name').value,
                cnic: document.getElementById('cnic').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/addDoctor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.text();
                const messageDiv = document.getElementById('message');
                messageDiv.textContent = result;
                messageDiv.style.color = response.ok ? 'green' : 'red';

                if (response.ok) {
                    doctorForm.reset();
                }
            } catch (error) {
                console.error('Error:', error);
                const messageDiv = document.getElementById('message');
                messageDiv.textContent = 'Error adding doctor. Please try again later.';
                messageDiv.style.color = 'red';
            }
        });
    }

    const patientForm = document.getElementById('patientForm');
if (patientForm) {
    patientForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent default form submission

        const messageDiv = document.getElementById('message'); // Initialize messageDiv

        // Collect form data
        const data = {
            full_name: document.getElementById('full-name').value,
            hospital_name: document.getElementById('hospital-name').value,
            password: document.getElementById('password').value
        };

        // Validate inputs
        if (!validateFullName(data.full_name)) {
            messageDiv.textContent = 'Full name must contain only letters and spaces and be at least 2 characters long.';
            messageDiv.style.color = 'red';
            return;
        }

        if (!validateHospitalName(data.hospital_name)) {
            messageDiv.textContent = 'Hospital name must contain only letters and spaces and be at least 2 characters long.';
            messageDiv.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/addPatient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.text();
            messageDiv.textContent = result;
            messageDiv.style.color = response.ok ? 'green' : 'red';

            if (response.ok) {
                patientForm.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'Error adding patient. Please try again later.';
            messageDiv.style.color = 'red';
        }
    });
}

});

/** 
 * Validate the full name.
 * @param {string} name - The full name to validate.
 * @returns {boolean} - True if valid, otherwise false.
 */

function validateFullName(name) {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    return nameRegex.test(name) && name.trim().length >= 2;
}
/**
 * Validate the hospital name.
 * @param {string} name - The hospital name to validate.
 * @returns {boolean} - True if valid, otherwise false.
 */
function validateHospitalName(name) {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    return nameRegex.test(name) && name.trim().length >= 2;
}
// Add this to script.js (or the relevant file)
module.exports = {
    validateFullName,
    validateHospitalName,
};



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-form');
    const submitButton = document.querySelector('.submit-button');

    // Form submission event
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const patientId = document.getElementById('patient_id').value;
        const fullName = document.getElementById('full_name').value;
        const hospitalName = document.getElementById('hospital_name').value;
        const reportFile = document.getElementById('report_file').files[0];

        // Validate form fields
        if (!patientId || !fullName || !hospitalName || !reportFile) {
            alert('All fields are required!');
            return;
        }

        // Validate file size (e.g., limit to 5 MB)
        const maxFileSize = 5 * 1024 * 1024; // 5 MB
        if (reportFile.size > maxFileSize) {
            alert('File size exceeds 5 MB!');
            return;
        }
     
        // Prepare form data for submission
        const formData = new FormData();
        formData.append('patient_id', patientId);
        formData.append('full_name', fullName);
        formData.append('hospital_name', hospitalName);
        formData.append('report_file', reportFile);

        // Disable submit button to prevent duplicate submissions
        submitButton.disabled = true;

        try {
            // Submit form data to the backend
            const response = await fetch('/addReport', {
                method: 'POST',
                body: formData,
            });

            const result = await response.text();

            // Handle response
            if (response.ok) {
                alert('Report added successfully!');
                form.reset(); // Reset the form
            } else {
                alert(`Error: ${result}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while adding the report. Please try again.');
        } finally {
            submitButton.disabled = false; // Re-enable the submit button
        }
    });
}); 

/*document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.sign-in-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Get form values
        const patientId = document.getElementById('patient-id').value;
        const fullName = document.getElementById('full-name').value;
        const hospitalName = document.getElementById('hospital-name').value;
        const password = document.getElementById('password').value;

        // Simple client-side validation
        if (!patientId || !fullName || !hospitalName || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Send the form data to the server as JSON
        try {
            const response = await fetch('/patient-portal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the content type is JSON
                },
                body: JSON.stringify({
                    patient_id: patientId,
                    full_name: fullName,
                    hospital_name: hospitalName,
                    password: password
                })
            });

            // Handle response
            if (response.ok) {
                window.location.href = '/patientReport/' + patientId; // Redirect to report page
            } else {
                alert('Invalid credentials.');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred. Please try again later.');
        }
    });
});*/

document.addEventListener('DOMContentLoaded', () => {
    let allReports = []; // To store all reports fetched from the server

    // Fetch all reports on page load
    async function fetchReports() {
        try {
            const response = await fetch('/reports');
            if (response.ok) {
                allReports = await response.json();
                console.log('Reports loaded:', allReports);
            } else {
                console.error('Failed to fetch reports:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    }

    // Call fetchReports when the page loads
    fetchReports();

    const form = document.querySelector('.sign-in-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const patientId = document.getElementById('patient-id').value.trim();
        const fullName = document.getElementById('full-name').value.trim();
        const hospitalName = document.getElementById('hospital-name').value.trim();
       // const password = document.getElementById('password').value.trim();//

        // Validate input fields
        if (!patientId || !fullName || !hospitalName ) {
            alert('Please fill in all fields.');
            return;
        }

        // Find the specific report by patient_id and other details
        const report = allReports.find((r) =>
            r.patient_id === parseInt(patientId) &&
            r.full_name === fullName &&
            r.hospital_name === hospitalName 
        );
            //r.password === password Assuming the password is stored in plaintext (not recommended)

      

        if (report) {
            // Display the report (example: alert, table, or redirect to another page)
            alert(`Report Found:\n${JSON.stringify(report, null, 2)}`);
            // Alternatively, render it dynamically on the page
            // Redirect to the report page with report details as query parameters
            const reportPageURL = `view-report.html?patientId=${encodeURIComponent(report.patient_id)}&fullName=${encodeURIComponent(report.full_name)}&hospitalName=${encodeURIComponent(report.hospital_name)}&testResult=${encodeURIComponent(report.test_result)}&date=${encodeURIComponent(report.date)}`;
            window.location.href = reportPageURL;
        } else {
            alert('Invalid credentials or no report found.');
        }
    });
});
// Function to handle View Report logic
function handleViewReport() {
    // Check if the current page is view-report.html
    if (document.body.id === "view-report-page") {
        // Extract the report path from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const reportPath = urlParams.get('path');

        // Set the report path in the iframe if available
        const reportFrame = document.getElementById('reportFrame');
        if (reportPath) {
            reportFrame.src = reportPath;
        } else {
            document.querySelector('#report').innerHTML = "<h2>Report not found.</h2>";
        }
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", handleViewReport);
document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here

    // Retrieve the stored data from sessionStorage
    const patientId = sessionStorage.getItem('patientId');
    const fullName = sessionStorage.getItem('fullName');
    const hospitalName = sessionStorage.getItem('hospitalName');

    // Display the retrieved data in the report section
    document.getElementById('patient-id').textContent = patientId;
    document.getElementById('full-name').textContent = fullName;
    document.getElementById('hospital-name').textContent = hospitalName;

    // Handle the "Download Report" button click
    document.getElementById('downloadReport').addEventListener('click', function() {
        alert('Your report is downloading...');
        // window.location.href = 'path/to/report.pdf';
    });

    // Handle the "Make Payment" button click
    document.getElementById('payment').addEventListener('click', function() {
        window.location.href = 'payment-page.html';
    });
});




