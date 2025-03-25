# Multi-Step Form with Local Storage

This is a React application implementing a multi-step form with local storage support. It allows users to enter personal details, address, and payment information across three steps.

## Features

- Multi-step form navigation (Next & Previous buttons)
- Form data validation before proceeding to the next step
- Auto-saving form data in local storage
- Form submission with console logging

## Technologies Used

- React
- useState & useEffect hooks
- Local Storage for persisting data

## Installation & Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/adityaxtalk/MultiStepForm.git
   ```
2. Navigate to the project directory:
   ```sh
   cd multi-step-form
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Form Steps

1. **Personal Details** - Name and email input fields.
2. **Address** - Street and city input fields.
3. **Payment** - Card number and expiry input fields.

## Local Storage

- Form data is automatically saved to `localStorage` when updated.
- Previously entered data is retrieved when the form reloads.

## License

This project is licensed under the MIT License.

## Contribution

Feel free to submit pull requests and issues!
