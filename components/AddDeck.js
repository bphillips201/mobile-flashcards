import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addDeckTitle } from '../actions';
import { submitDeckTitle } from '../utils/api';
import { purple } from '../utils/colors';
import shortid from 'shortid';
import { FormLabel, FormInput, Button } from 'react-native-elements';

class AddDeck extends Component {

  state = {
    title: ''
  }

  handleTitleChange = (title) => {
    this.setState(() => ({
      title
    }))
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DeckList' }))
  }

  submit = () => {
    const { title } = this.state;
    const id = shortid.generate();

    this.props.dispatch(addDeckTitle(title, id))
    
    submitDeckTitle(title, id);

    this.setState({ title: '' })

    Keyboard.dismiss();

    this.toHome();
  }

  render() {
    const { title } = this.state;

    return (
      <View>
        <FormLabel>What is the title of your new deck?</FormLabel>
        <KeyboardAvoidingView>
          <FormInput
            value={title}
            onChangeText={this.handleTitleChange}
          />
        </KeyboardAvoidingView>
        <Button
          large
          title="Create Deck"
          buttonStyle={{marginTop: 15}}
          backgroundColor={purple}
          onPress={this.submit}
        />
      </View>
    )
  }
}

export default connect(null)(AddDeck);