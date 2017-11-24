import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView style={{flex: 1}}>
        {Object.keys(decks).map((deck) => {
          return (
            <Text key={deck}>{deck}</Text>
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