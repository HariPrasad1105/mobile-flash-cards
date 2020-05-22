import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import DeckCard from './DeckCard';
import { retrieveDecks } from '../utils/api';
import { handleReceiveData } from '../actions/deck';

class DeckDashboard extends Component {

  componentDidMount() {

    retrieveDecks()
      .then((decks) => {
        this.props.dispatch(
          handleReceiveData(decks)
        )
      });

  }

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>

        {(
          decks === undefined || Object.keys(decks).length === 0)
          ? (
            <Text style={{ fontSize: 20 }}>
              Please add a deck to start the quiz
            </Text>
          )
          : (
            <ScrollView style={{ alignSelf: 'stretch' }}>
              <Text style={styles.heading}>Decks</Text>
              {Object.keys(decks).map(
                (deckName) => (
                  <DeckCard
                    deckName={deckName}
                    key={deckName}
                    navigate={this.props.navigation} />
                )
              )}
            </ScrollView>
          )}

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
  heading: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 25,
    color: 'purple',
    textAlign: 'center'
  }
})

const mapStateToProps = (decks) => {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckDashboard);
