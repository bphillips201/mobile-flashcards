import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDeck } from '../utils/api';
import { AppLoading } from 'expo';

class DeckDetail extends Component {
  state = {
    ready: false,
    deck: {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle
    }
  }

  componentDidMount () {
    const { navigation } = this.props;

    fetchDeck(navigation.state.params.deckId)
      .then((deck) => {
        this.setState({
          deck,
          ready: true
        })
      })
  }

  render() {
    const { deck, ready } = this.state;

    console.log(deck);

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={{flex: 1}}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>

        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>      
    )
  }
}

export default connect(null)(DeckDetail);