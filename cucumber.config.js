const config = {
  default: {
    require: [
      'src/tests/bdd/support/setup.ts',
      'src/tests/bdd/support/**/*.ts',
      'src/tests/bdd/steps/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber_report.html',
      '@cucumber/pretty-formatter'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    strict: true,
    worldParameters: {
      appUrl: 'http://localhost:3000'
    },
    paths: ['src/tests/bdd/features/**/*.feature']
  }
};

module.exports = config;
