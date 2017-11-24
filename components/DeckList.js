import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions/index';
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
    console.log(decks);

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView style={{flex: 1}}>
        {Object.keys(decks).map((deck) => {
          return (
            <TouchableOpacity key={deck} onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckId: deck }
            )}>
              <Text>{deck}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(DeckList)