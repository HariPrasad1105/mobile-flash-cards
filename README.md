# Mobile Flash Cards
The application allows a user to create a deck of flash cards, each capturing a question and answer for the deck's topic. The user can then start a quiz to test their knowledge of a particular topic.

# Getting Started
To run this project locally, clone this repository and run the following commands:

- yarn install <br />
- expo start <br />

# Tech Stack
This is a **React Native** app and as such the project was started using create-react-native-app. The code base is rather straight forward and a standard React component model is used. **Redux** is used for state management and React Native's **AsyncStorage** is used for persistence.

# Data
The data relies on a Deck Name which has to be unique. Each DeckName has an array of questions as follows:
```
{
  React: {
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
```
