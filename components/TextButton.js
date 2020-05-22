import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <View>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={{ color: 'white' }}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 10,
    textAlignVertical: 'center'
  }
})


/*

  onPress = () => {
    saveDataToAsyncStorage;
    update redux;
    navigate to deckDashboard
  }


  addDeck -> deckName
  deleteDeck -> deckName
  addQuestion -> deckName, question, Answer

*/