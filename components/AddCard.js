import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/question';
import { saveCard } from '../utils/api';

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
    error: false,
  }

  handleSubmit = () => {

    const { question, answer } = this.state;

    if (question.length === 0 || answer.length === 0) {
      this.setState({ error: true });
    } else {

      const { dispatch, navigation, route } = this.props;

      saveCard(route.params.deckName, {
        question: question.trim(),
        answer: answer.trim(),
      })

      dispatch(handleAddQuestion(route.params.deckName, {
        question: question.trim(),
        answer: answer.trim(),
      }))

      navigation.navigate("Home")
    }

  }

  render() {
    return (
      <View style={styles.container}>
        {
          (this.state.error && (this.state.question.length === 0 || this.state.answer.length === 0)) && (
            <Text style={styles.error}>Please enter Question and/or Answer</Text>
          )
        }
        <Text style={styles.heading}>What's the Question ?</Text>
        <TextInput style={[styles.input, { marginBottom: 35 }]}
          value={this.state.question}
          placeholder="Eg: What is Texas capital"
          onChangeText={(question) => this.setState({ question })}
        />
        <Text style={styles.heading}>What's the Answer ?</Text>
        <TextInput style={styles.input}
          value={this.state.answer}
          placeholder="Eg: Austin"
          onChangeText={(answer) => this.setState({ answer })}
        />
        <TouchableOpacity style={styles.addCard} onPress={this.handleSubmit} >
          <Text style={styles.addCardText}>
            Add Card
          </Text>
        </TouchableOpacity>
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
  input: {
    height: 50,
    width: 350,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,
    borderRadius: 7,
    textAlign: 'center',
    marginBottom: 15,
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
    marginTop: 40,
  },
  addCardText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 11,
    fontSize: 17,
  },
  error: {
    fontSize: 15,
    color: 'red',
  },
  heading: {
    fontSize: 20,
  }
})


export default connect()(AddCard);