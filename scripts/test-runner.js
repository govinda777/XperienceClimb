#!/usr/bin/env node

/**
 * XperienceClimb Test Runner
 * 
 * This script provides a unified interface for running different types of tests
 * and generating comprehensive reports.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createReportsDir() {
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    log('📁 Created reports directory', 'blue');
  }
}

function runCommand(command, description) {
  log(`\n🚀 ${description}`, 'cyan');
  log(`Running: ${command}`, 'yellow');
  
  try {
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    log(`✅ ${description} completed successfully`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    log(`Error: ${error.message}`, 'red');
    return false;
  }
}

function runUnitTests(withCoverage = false) {
  const command = withCoverage 
    ? 'npm run test:coverage' 
    : 'npm run test:unit';
  
  return runCommand(command, 'Unit Tests');
}

function runBDDTests() {
  return runCommand('npm run test:bdd', 'BDD Tests');
}

function runAllTests() {
  log('\n🧗‍♂️ XperienceClimb Test Suite', 'bright');
  log('=====================================', 'bright');
  
  createReportsDir();
  
  let success = true;
  
  // Run unit tests with coverage
  if (!runUnitTests(true)) {
    success = false;
  }
  
  // Run BDD tests
  if (!runBDDTests()) {
    success = false;
  }
  
  // Generate summary
  log('\n📊 Test Summary', 'bright');
  log('================', 'bright');
  
  if (success) {
    log('🎉 All tests passed!', 'green');
    log('📋 Check the reports/ directory for detailed results', 'blue');
  } else {
    log('💥 Some tests failed!', 'red');
    log('📋 Check the output above and reports/ directory for details', 'yellow');
    process.exit(1);
  }
}

function runLinting() {
  return runCommand('npm run lint', 'ESLint');
}

function runTypeCheck() {
  return runCommand('npm run type-check', 'TypeScript Type Check');
}

function runPreCommit() {
  log('\n🔍 Pre-commit Checks', 'bright');
  log('====================', 'bright');
  
  let success = true;
  
  // Type checking
  if (!runTypeCheck()) {
    success = false;
  }
  
  // Linting
  if (!runLinting()) {
    success = false;
  }
  
  // Fast test suite
  if (!runCommand('npm run test:pre-commit', 'Pre-commit Tests')) {
    success = false;
  }
  
  if (success) {
    log('\n✅ All pre-commit checks passed!', 'green');
  } else {
    log('\n❌ Pre-commit checks failed!', 'red');
    process.exit(1);
  }
}

function showHelp() {
  log('\n🧗‍♂️ XperienceClimb Test Runner', 'bright');
  log('================================', 'bright');
  log('\nUsage: node scripts/test-runner.js [command]', 'cyan');
  log('\nCommands:', 'yellow');
  log('  all        Run all tests (unit + BDD) with coverage', 'white');
  log('  unit       Run unit tests only', 'white');
  log('  bdd        Run BDD tests only', 'white');
  log('  coverage   Run unit tests with coverage report', 'white');
  log('  lint       Run ESLint', 'white');
  log('  typecheck  Run TypeScript type checking', 'white');
  log('  precommit  Run pre-commit checks', 'white');
  log('  help       Show this help message', 'white');
  log('\nExamples:', 'yellow');
  log('  node scripts/test-runner.js all', 'cyan');
  log('  node scripts/test-runner.js unit', 'cyan');
  log('  node scripts/test-runner.js precommit', 'cyan');
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'all':
    runAllTests();
    break;
  case 'unit':
    runUnitTests();
    break;
  case 'bdd':
    runBDDTests();
    break;
  case 'coverage':
    runUnitTests(true);
    break;
  case 'lint':
    runLinting();
    break;
  case 'typecheck':
    runTypeCheck();
    break;
  case 'precommit':
    runPreCommit();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (command) {
      log(`❌ Unknown command: ${command}`, 'red');
    }
    showHelp();
    process.exit(1);
}
