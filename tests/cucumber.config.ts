export default {
  import: ['tests/step-definitions/**/*.ts'],
  paths: ['features/**/*.feature'],
  requireModule: ['ts-node/register'],
  format: ['summary', 'progress'],
  parallel: 1
};
