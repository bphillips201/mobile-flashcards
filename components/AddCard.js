import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addCardToDeck } from '../actions';
import { submitCardToDeck } from '../utils/api';
import shortid from 'shortid';

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
          <Text>What is your question?</Text>
          <TextInput
            value={question}
            onChangeText={this.handleQuestionChange}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView>
          <Text>What is the answer?</Text>
          <TextInput
            value={answer}
            onChangeText={this.handleAnswerChange}
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