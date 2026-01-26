# Cucumber.js Project

## 📌 Description
This project uses **Cucumber.js** for writing and executing BDD (Behavior Driven Development) tests using JavaScript. The main application logic is in `src/shouty/`, and the tests are located in `features/`.

Link to the official site of cucumber school - https://school.cucumber.io/collections

## 🚀 Installation
Make sure you have **Node.js** (version 16+ recommended) installed before starting.

```sh
# Install dependencies
npm install
```

## 🏗️ Project Structure
```
/project-root
│── features/                  # Gherkin feature files and step definitions
│   ├── step_definitions/       # Step implementations
│   │   ├── steps.js
│   │   ├── cat_steps.js
│   ├── support/                # Helper utilities and parameters
│   │   ├── person_parameter.js
│   ├── hear_shout.feature      # Cucumber feature file
│   ├── cat.feature             # Gherkin language demo feature
│── src/shouty/                 # Application source code
│   ├── shouty.js               # Main logic file
│   ├── test/
│   │   ├── network.test.js      # Unit tests for Network/Person
│── .gitignore                  # Git ignore file
│── README.md                   # Documentation
│── package.json                # NPM configuration
│── package-lock.json           # Dependency lock file
│── report.json                 # JSON test report (generated)
│── report.html                 # HTML test report (generated)
```
## ▶ Running Tests
```sh
npm test
```
Or generate reports:
```sh
npm run test:json
npm run test:html
```

## 📝 Notes
- `features/support/` contains custom parameter types (e.g., `{person}`), so support files must be loaded. The npm scripts already include this.
- `features/cat.feature` uses the `en-lol` language for Gherkin keyword demo. If you want it to run as standard Gherkin, replace it with `Feature/Scenario/Given/When/Then`.
