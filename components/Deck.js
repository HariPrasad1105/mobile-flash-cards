import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Deck extends Component {

  handleAddCard = () => {
    this.props.navigation.navigate('AddCard', {
      deckName: this.props.route.params.title,
    })
  }

  handleQuizStart = () => {
    this.props.navigation.navigate('Quiz', {
      deckName: this.props.route.params.title,
    })
  }

  render() {

    const { title } = this.props.route.params;
    const { deckData } = this.props;
    const numberOfCards = deckData.questions === undefined ? 0 : deckData.questions.length;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 20, opacity: 0.4 }}>
          {numberOfCards} cards
        </Text>
        <View style={styles.buttons}>
          <View>
            <TouchableOpacity style={styles.startQuiz}
              onPress={this.handleQuizStart}
            >
              <Text style={styles.startQuizText}>
                Start Quiz
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.addCard}
              onPress={this.handleAddCard}
            >
              <Text style={styles.addCardText}>
                Add Card
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 65,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCard: {
    backgroundColor: 'black',
    height: 45,
    width: 100,
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
  addCardText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 11,
    fontSize: 17,
  },
  startQuiz: {
    backgroundColor: 'purple',
    height: 45,
    width: 100,
    borderRadius: 7,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    marginBottom: 10,
    marginTop: 10
  },
  startQuizText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 11,
    fontSize: 17,
  }
})

const mapStateToProps = (decks, params) => {
  const title = params.route.params.title;
  return {
    deckData: decks[title]
  }
}

export default connect(mapStateToProps)(Deck);