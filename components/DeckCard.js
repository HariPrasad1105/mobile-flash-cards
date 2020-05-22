import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class DeckCard extends Component {

  navigateToDeck = () => {

    const { navigate, deckName, deckData } = this.props;

    navigate.navigate('Deck', {
      'title': deckName,
      deckData: deckData
    })
  }

  render() {

    const { deckName, deckData } = this.props;
    const noOfCards = deckData.questions === undefined ? 0 : deckData.questions.length;

    return (
      <TouchableOpacity onPress={this.navigateToDeck}>
        <View style={styles.card}>
          <Text style={[styles.text, { fontSize: 25 }]}>
            {deckName}
          </Text>
          <Text style={[styles.text, { fontSize: 20, marginTop: 80 }]}>
            {noOfCards} Cards
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    alignSelf: 'stretch',
    alignContent: 'center',
    height: 200,
    textAlign: 'center',
  },
  text: {
    color: 'purple',
    textAlign: 'center'
  }
})

const mapStateToProps = (decks, params) => {

  const { deckName } = params;

  return {
    deckData: decks[deckName]
  }

}

export default connect(mapStateToProps)(DeckCard);