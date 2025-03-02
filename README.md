# Cucumber.js Project

## 📌 Description
This project uses **Cucumber.js** for writing and executing BDD (Behavior Driven Development) tests using JavaScript. The main application logic is in `src/shouty/`, and the tests are located in `features/`.

## 🚀 Installation
Make sure you have **Node.js** (version 16+ recommended) installed before starting.

```sh
# Install dependencies
npm install

# Install Cucumber.js
npm install --save-dev @cucumber/cucumber
```

## 🏗️ Project Structure
```
/project-root
│── features/                  # Gherkin feature files and step definitions
│   ├── step_definitions/       # Step implementations
│   │   ├── steps.js            
│   ├── support/                # Helper utilities and parameters
│   │   ├── person_parameter.js 
│   ├── hear_shout.feature      # Cucumber feature file
│── src/shouty/                 # Application source code
│   ├── shouty.js               # Main logic file
│── .gitignore                  # Git ignore file
│── README.md                   # Documentation
│── package.json                # NPM configuration
│── package-lock.json           # Dependency lock file
```
## ▶ Running Tests
```sh
npm test
```
Or directly via Cucumber.js:
```sh
npx cucumber-js
```

## ⚙ Cucumber Configuration
Add a `cucumber.js` configuration file in the project root:
```json
module.exports = {
  default: `--require features/step_definitions/**/*.js --format progress`
};
```