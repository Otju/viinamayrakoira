
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'otjuso',
  applicationName: 'viinamayrakoira',
  appUid: 'bLCfVvtQsYvt0JmWXV',
  orgUid: 'zhFc6YNSL7LXwsmTqg',
  deploymentUid: 'cd81e0ef-7e48-4863-b553-d26612893845',
  serviceName: 'apollo-lambda-backend',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'prod',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '4.1.1',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'apollo-lambda-backend-prod-graphql', timeout: 6 };

try {
  const userHandler = require('././src/index.js');
  module.exports.handler = serverlessSDK.handler(userHandler.graphqlHandler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}