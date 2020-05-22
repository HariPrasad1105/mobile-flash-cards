import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { saveDeck } from '../utils/api';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { handleAddDeck } from '../actions/deck';

class AddDeck extends Component {

  state = {
    title: ''
  }

  handleSubmit = () => {

    const { title } = this.state;

    // save deck to AsyncStorage
    saveDeck(title);

    // add deck to redux store
    this.props.dispatch(handleAddDeck(title));

    this.setState({ title: '' });

    //navigate to home screen
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: 'Decks',
      })
    )
  }

  render() {
    console.log("rendered")
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          What is the title of the deck?
        </Text>
        <TextInput style={styles.input}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity style={[styles.button]} onPress={this.handleSubmit}>
          <Text style={{ color: 'white' }}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
  },
  input: {
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 7,
  },
  button: {
    textAlign: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    marginTop: 10
  }
})

export default connect()(AddDeck);
