import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions';
import { AppLoading } from 'expo';
import { List, ListItem, Text } from 'react-native-elements'

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
      <View style={{flex: 1}}>
        {decks.length === 0
          ? <View style={styles.centered}>
              <Text h5>No Decks created yet!</Text>
              <Text h5>To get started, Add a Deck</Text>
            </View>
          : <ScrollView>
              <List>
                {decks.map((deck) => {
                  return (
                    <ListItem
                      key={deck.id}
                      title={deck.title}
                      subtitle={ deck.questions.length === 1 ? `${deck.questions.length} card` : `${deck.questions.length} cards` }
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
            </ScrollView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

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