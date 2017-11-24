import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addDeckTitle } from '../actions';
import { submitDeckTitle } from '../utils/api';
import shortid from 'shortid';

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
      <View style={{flex: 1}}>
        <Text>What is the title of your new deck?</Text>
        <KeyboardAvoidingView>
          <TextInput
            value={title}
            onChangeText={this.handleTitleChange}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null)(AddDeck);