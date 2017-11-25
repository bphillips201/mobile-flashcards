import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions';
import { AppLoading } from 'expo';

class DeckList extends Component {
  state = {
    ready: false
  }
  
  componentDidMount () {
    fetchDecks()
      .then((decks) => {
        this.props.dispatch(getDecks(decks))
        this.setState({
          ready: true
        })
      })
  }

  render() {
    const { ready } = this.state;
    const { decks } = this.props;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView style={{flex: 1}}>
        {decks.map((deck) => {
          return (
            <TouchableOpacity key={deck.id} onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { 
                deckTitle: deck.title,
                deckId: deck.id
              }
            )}>
              <Text>{deck.title}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks: Object.keys(decks).map((i) => {
      return {
        id: i,
        ...decks[i]
      }
    })
  }
}

export default connect(
  mapStateToProps
)(DeckList)