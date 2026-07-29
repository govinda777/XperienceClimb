---
name: run-bot-tests
description: >-
  Use this skill to run the unit, integration, and BDD (Cucumber) tests for the chatbot.
---

# Running Chatbot Tests

This skill describes how to run and verify the chatbot tests, including unit tests, integration tests, and BDD (Behavior-Driven Development) scenarios.

## Pre-requisites

Make sure that you have installed the project dependencies:

```bash
make install
```

## Running the Tests

You can run different sets of tests using the following commands:

### 1. Run Unit & Pre-Commit Tests

Executes Jest tests for all components, hooks, and services, excluding integration tests:

```bash
make test
```

### 2. Run BDD Tests (Cucumber)

Executes behavior-driven integration tests for the bot's flow (lead collection, pricing catalog, handoff, and guardrails):

```bash
make test-bdd
```

### 3. Run All Tests

Runs both unit tests and BDD tests sequentially:

```bash
make test-all
```

## Troubleshooting

If BDD tests fail with module resolution/ESM errors, ensure that `TS_NODE_COMPILER_OPTIONS` is correctly set to compile to CommonJS (this is already handled automatically in the [Makefile](file:///Users/govinda/projetos/XperienceClimb/Makefile)).
