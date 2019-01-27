const AWS = require('aws-sdk');

const MESSAGES_TABLE = process.env.MESSAGES_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2012-08-10',
    region: AWS_DEPLOY_REGION
});

module.exports.post = async (event, context) => {
  const params = {
    TableName: MESSAGES_TABLE,
    Item: {
        messageId: `${Math.random()}`,
        message: "Hello World!"
    },
  };

  try {
    const data = await dynamoDb.put(params).promise();
    return { statusCode: 200, body: JSON.stringify({ params, data }) };
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not post: ${error.stack}`
    };
  }
};

module.exports.fetch = async (event, context) => {
  const params = {
    TableName: MESSAGES_TABLE
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    };
  }
};

