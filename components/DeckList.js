import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions';
import { AppLoading } from 'expo';
import { List, ListItem } from 'react-native-elements'

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
      <List>
        {decks.map((deck) => {
          return (
            <ListItem
              key={deck.id}
              title={deck.title}
              onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                { 
                  deckTitle: deck.title,
                  deckId: deck.id
                }
              )}
            />
          )
        })}
      </List>
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