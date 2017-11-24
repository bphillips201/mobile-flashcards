import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckId
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Deck Detail</Text>
      </View>      
    )
  }
}

export default DeckDetail;