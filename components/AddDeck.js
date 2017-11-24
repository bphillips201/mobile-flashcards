import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addDeck } from '../actions';
import { submitDeck } from '../utils/api';

class AddDeck extends Component {

  state = {
    name: ''
  }

  handleNameChange = (name) => {
    this.setState(() => ({
      name
    }))
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DeckList' }))
  }
  
  submit = () => {
    const { name } = this.state;

    this.props.dispatch(addDeck(name))
    
    submitDeck(name);

    this.setState({ name: '' })

    Keyboard.dismiss();

    this.toHome();
  }

  render() {
    const { name } = this.state;

    return (
      <View style={{flex: 1}}>
        <Text>What is the name of your new deck?</Text>
        <KeyboardAvoidingView>
          <TextInput
            value={name}
            onChangeText={this.handleNameChange}
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