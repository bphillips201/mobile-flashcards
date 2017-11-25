import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addCardToDeck } from '../actions';
import { submitCardToDeck } from '../utils/api';
import { purple } from '../utils/colors';
import shortid from 'shortid';

import { FormLabel, FormInput, Button } from 'react-native-elements';

class AddDeck extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }

  handleQuestionChange = (question) => {
    this.setState(() => ({ question }))
  }
  handleAnswerChange = (answer) => {
    this.setState(() => ({ answer }))
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  submit = ({ navigation }) => {
    const { question, answer } = this.state;
    const { deckId } = this.props.navigation.state.params;
    const id = shortid.generate();
    const card = {
      question,
      answer
    }

    this.props.dispatch(addCardToDeck(card, deckId))
    
    submitCardToDeck(card, deckId);

    this.setState({ answer: '', question: '' })

    Keyboard.dismiss();

    this.toHome();
  }

  render() {
    const { question, answer } = this.state;

    return (
      <View style={{flex: 1}}>
        <KeyboardAvoidingView>
          <FormLabel>What is your question?</FormLabel>
          <FormInput
            value={question}
            onChangeText={this.handleQuestionChange}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView>
          <FormLabel>What is the answer?</FormLabel>
          <FormInput
            value={answer}
            onChangeText={this.handleAnswerChange}
          />
        </KeyboardAvoidingView>

        <Button
          large
          title="Add Card"
          buttonStyle={{marginTop: 15}}
          backgroundColor={purple}
          onPress={this.submit}
        />
      </View>
    )
  }
}

export default connect(null)(AddDeck);