import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import config from "./config";
import * as serviceWorker from './serviceWorker';

Amplify.configure({//setting the various AWS resources that we want to interact with
    Auth: {//congnito
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {//s3
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {//api Gateway
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
