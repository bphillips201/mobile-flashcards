import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions';

class DeckList extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
  }

  render() {
    const { decks } = this.props;
    console.log(decks);

    return (
      <View>
        <Text>DeckList</Text>
      </View>
    )
  }
}

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(DeckList)