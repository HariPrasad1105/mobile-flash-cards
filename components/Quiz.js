import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { retrieveDeck } from '../utils/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

class Quiz extends Component {

  state = {
    cards: null,
    answered: 0,
    total: 0,
    answeredCorrectly: 0,
    displayOptions: true
  }

  componentDidMount() {
    const { deckName } = this.props.route.params;

    retrieveDeck(deckName)
      .then((cards) => {

        if (cards.questions !== undefined) {
          this.setState({
            cards,
            total: cards.questions.length
          })
        }
      })
  }

  handleAnswerClick = (userOption) => {
    const { answered, cards } = this.state;

    this.setState((prevState) => ({
      answered: prevState.answered + 1,
      answeredCorrectly: userOption === 'correct'
        ? prevState.answeredCorrectly + 1
        : prevState.answeredCorrectly
    }))

  }

  handleStartOverClick = () => {

    this.setState({
      answered: 0,
      answeredCorrectly: 0,
    })

    this.props.navigation.navigate("Quiz", {
      deckName: this.props.route.params.title,
    })
  }

  handleGoHomeClick = () => {
    this.props.navigation.navigate("Home")
  }

  handleShowAnswerClick = () => {
    this.setState((prevState) => ({
      displayOptions: !prevState.displayOptions
    }))
  }

  render() {
    const { answered, total, answeredCorrectly, cards } = this.state;
    const progess = Math.ceil((answeredCorrectly / total) * 100);

    if (total === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.answerText}>
            Please add Question to the deck and start the quiz
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {answered === total
          ? (
            <View>
              <Text style={{ fontSize: 20, marginBottom: 25, textAlign: 'center' }}>
                {`You have answered ${answeredCorrectly} out of ${total} cards correctly.`}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>You Scored</Text>
              <Text style={{ fontSize: 80, textAlign: 'center', color: 'purple' }}>{progess} %</Text>
              <View style={{ marginTop: 85, alignItems: 'center' }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'purple' }]}
                  onPress={this.handleStartOverClick}
                >
                  <Text style={styles.buttonText}>Start Over</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'black' }]}
                  onPress={this.handleGoHomeClick}
                >
                  <Text style={styles.buttonText}>Go Home</Text>
                </TouchableOpacity>
              </View>
            </View>)
          : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.question}> {cards.questions[answered].question} ?</Text>
              <Text style={{ fontSize: 16 }}>{total - answered} question(s) remaining</Text>
              <View style={{ marginTop: 85 }}>

                <TouchableOpacity style={[styles.button, { backgroundColor: 'purple' }]}
                  onPress={this.handleShowAnswerClick}
                >
                  <Text style={styles.buttonText}>
                    {this.state.displayOptions ? 'Show Answer' : 'Hide Answer'}
                  </Text>
                </TouchableOpacity>

                {this.state.displayOptions
                  ? (
                    <View>
                      <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]}
                        onPress={() => this.handleAnswerClick('correct')}
                      >
                        <Text style={styles.buttonText}>Correct</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}
                        onPress={() => this.handleAnswerClick('inCorrect')}
                      >
                        <Text style={styles.buttonText}>Incorrect</Text>
                      </TouchableOpacity>
                    </View>
                  )
                  : <Text style={styles.answerText}>Answer is {cards.questions[answered].answer}</Text>}

              </View>
            </View>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 25
  },
  button: {
    height: 45,
    width: 125,
    borderRadius: 7,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 11,
    fontSize: 17,
  },
  answerText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }
})

export default Quiz;
