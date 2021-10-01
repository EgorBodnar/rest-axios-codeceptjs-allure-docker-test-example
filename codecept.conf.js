require('ts-node/register');

exports.config = {
  tests: './test/*_test.ts',
  output: './output',
  jest: {},
  bootstrap: null,
  name: 'rest-ts-test-axios-codeceptjs-allure-example',
  plugins: {
    allure: {
      enabled: true,
    },
  },
};
