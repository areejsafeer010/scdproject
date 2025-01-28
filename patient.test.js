const { validateFullName, validateHospitalName} = require('./script');

describe('Patient Registration', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="patientForm">
                <input id="full-name" type="text" />
                <input id="hospital-name" type="text" />
                <div id="message"></div>
            </form>
        `;
    });

    test('validateFullName should return true for valid names', () => {
        expect(validateFullName('John Doe')).toBe(true);
        expect(validateFullName('Jane')).toBe(true);
        expect(validateFullName('Dr. Smith')).toBe(false); // Contains invalid character '.'
    });

    test('validateHospitalName should return true for valid hospital names', () => {
        expect(validateHospitalName('City Hospital')).toBe(true);
        expect(validateHospitalName('St Marys')).toBe(true);
        expect(validateHospitalName('City123')).toBe(false); // Contains digits
    });

    /*test('Display message updates the DOM element correctly', () => {
        const messageDiv = document.getElementById('message');

        displayMessage(messageDiv, 'Success!', 'success');
        expect(messageDiv.textContent).toBe('Success!');
        expect(messageDiv.className).toBe('message success-message');

        displayMessage(messageDiv, 'Error occurred.', 'error');
        expect(messageDiv.textContent).toBe('Error occurred.');
        expect(messageDiv.className).toBe('message error-message');
    });

    test('Form submission should validate inputs and update message div', () => {
        const patientForm = document.getElementById('patientForm');
        const messageDiv = document.getElementById('message');

        document.getElementById('full-name').value = 'John Doe';
        document.getElementById('hospital-name').value = 'City Hospital';

        patientForm.dispatchEvent(new Event('submit'));
        expect(messageDiv.textContent).toBe('Registration successful.');
        expect(messageDiv.className).toBe('message success-message');

        document.getElementById('full-name').value = 'J';
        document.getElementById('hospital-name').value = '';

        patientForm.dispatchEvent(new Event('submit'));
        expect(messageDiv.textContent).toBe('Full name must contain only letters and spaces and be at least 2 characters long.');
        expect(messageDiv.className).toBe('message error-message');
    });*/
});
