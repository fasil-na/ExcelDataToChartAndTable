# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


**Server side**

This Node.js application provides a REST API for handling Excel files with Express.js and MongoDB. It supports uploading Excel files, retrieving data with pagination, and fetching data for bar graphs.

Features
Upload Excel Files: Stores file data in MongoDB.
Retrieve Data: Paginated data access from MongoDB.
Bar Graph Data: Retrieves recent data for visualization.

Setup
Clone the Repo:

bash
Copy code
git clone https://github.com/yourusername/repository-name.git
cd repository-name
Install Dependencies:

bash
Copy code
npm install
Configure MongoDB: Update the mongoURI in index.js with your MongoDB connection string.

Run the Server:

bash
Copy code
npm start

Endpoints
POST /upload: Uploads and processes an Excel file.
GET /data: Fetches paginated data.
GET /dataForBarGraph: Retrieves recent data for bar graphs


**Client side**

File Upload and Data Visualization
This project includes React components for handling file uploads and visualizing data with charts. It consists of a file upload component and a bar graph component, integrated with an Express backend.

Features
File Upload and Table Display: Upload Excel files, display data in a table, and handle pagination.
Bar Graph Visualization: Display revenue data as a bar graph, including monthly revenue and profit.
Components
FileUploadTable
Functionality: Allows users to upload Excel files and view the data in a paginated table format.
Features:
File upload with form-data.
Data fetching with pagination.
Navigation to a graph view page.
Dependencies: axios, react-router-dom
BarGraph
Functionality: Displays revenue and profit data from an API in a bar graph.
Features:
Fetches and processes data from the backend.
Generates a bar chart with monthly revenue data.
Dependencies: axios, react-chartjs-2, chart.js
Setup
Clone the Repo:

bash
Copy code
git clone https://github.com/yourusername/repository-name.git
cd repository-name
Install Dependencies:

bash
Copy code
npm install
Run the Application: Ensure the backend server is running (see backend setup in the backend README). Start the React app with:

bash
Copy code
npm start
Usage
File Upload and Table View:

Navigate to the upload page.
Upload an Excel file to populate the table.
Use pagination controls to navigate through data.
Bar Graph View:

Click on the "Graph view" button in the file upload component.
View the bar graph showing monthly revenue.