# React Azure SSO Template

This project is a template for a React application with Azure Single Sign-On (SSO) integration using Azure Active Directory (AAD).

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- Git

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/dipinkrishnan1/REACT_AZURE_SSO_TEMPLATE.git
    ```

2. Navigate to the project directory:

    ```bash
    cd react-azure-sso-template
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up Azure Active Directory:

    - Go to the [Azure Portal](https://portal.azure.com/).
    - Create a new Azure Active Directory App Registration.
    - Note down the `Application (client) ID`, `Directory (tenant) ID`, and create a `Client Secret`.
    - Configure the Redirect URI in the AAD app registration to match your application's URI (e.g., `http://localhost:3000`).

5. Configure environment variables:

    Create a `.env` file in the root of the project and add the following:

    ```env
    REACT_APP_AAD_CLIENT_ID=your-client-id
    REACT_APP_AAD_TENANT_ID=your-tenant-id
    REACT_APP_AAD_REDIRECT_URI=http://localhost:3000
    ```

    Replace `your-client-id` and `your-tenant-id` with the values from your Azure AD App Registration.

6. Start the application:

    ```bash
    npm start
    ```

    The app will be accessible at `http://localhost:3000`. Any login functionality will now use Azure SSO.

## Additional Configuration

- Customize the UI and functionality in the `src` directory.
- Explore the Azure AD Authentication Library (MSAL) for additional features.

## Contributing

Feel free to contribute to this project. Create a pull request with your changes.

## License

This project is licensed under the MastechDigital License.

