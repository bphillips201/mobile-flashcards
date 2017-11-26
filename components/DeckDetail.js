import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDeck } from '../utils/api';
import { purple } from '../utils/colors';
import { AppLoading } from 'expo';
import { Text, Button } from 'react-native-elements';

class DeckDetail extends Component {
  state = {
    ready: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckTitle
    }
  }

  componentDidMount () {
    const { deckId } = this.props.navigation.state.params;

    fetchDeck(deckId)
      .then((deck) => {
        this.setState({
          deck,
          ready: true
        })
      })
  }

  render() {
    const { ready } = this.state;
    const { deck, id } = this.props;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Text h2 style={{textAlign: "center", marginTop: 15}}>{deck.title}</Text>
        <Text h4 style={{textAlign: "center", marginTop: 15}}>{deck.questions.length} cards</Text>

        <Button
          large
          title="Add Card"
          buttonStyle={{marginTop: 30}}
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { deckId: id }
          )}
        />

        <Button
          large
          title="Start Quiz"
          backgroundColor={purple}
          buttonStyle={{marginTop: 15}}
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { questions: deck.questions }
          )}
        />
      </View>      
    )
  }
}

function mapStateToProps (decks, ownProps) {
  const { deckId } = ownProps.navigation.state.params;

  return {
    deck: decks[deckId],
    id: deckId
  }
}

export default connect(mapStateToProps)(DeckDetail);