# Here2There Frontend

For a general overview of Here2There, see the [project README](../README.md).

## Built With

- [Create React App](https://create-react-app.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v14 or above) and npm

### Install and Run

1. Navigate to client directory

```sh
cd v29-bears-team-07/client
```

2. Install dependencies

```sh
npm install
```

3. Add a `.env` file in the `client` directory and add the following to the file: `REACT_APP_IPINFO_ACCESS_TOKEN=YOUR_TOKEN_HERE`

- The actual token should be obtained from https://ipinfo.io/ or from a member of the Here2There team.

4. Run development server

```sh
npm start
```

5. If you haven't already, set up and run the [backend](../server/README.md) as well. It's required for development.

<!-- USAGE EXAMPLES -->

### Development

We support the standard create-react-app scripts. For more information, see our [package.json](./package.json) or visit https://create-react-app.dev/docs/available-scripts.

We also support scripts for testing, linting, and formatting code.

```sh
npm run test
npm run lint
npm run format
# runs versions of the above three commands meant for pre-commit scripts and CI pipelines
npm run quality-check
```
