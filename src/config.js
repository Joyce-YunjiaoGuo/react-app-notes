export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "notes-app-uploads"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://buhuao3qxg.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_TRI9n5PJ2",
      APP_CLIENT_ID: "17qe3ne9290pe4vti6vkkkje3n",
      IDENTITY_POOL_ID: "us-east-2:91d5835b-063c-45aa-b0ea-1003266ba10f"
    }
  };