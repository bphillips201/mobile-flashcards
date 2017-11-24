import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

class DeckList extends Component {
  render() {
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