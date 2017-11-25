import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';

class Quiz extends Component {
  state = {
    currentQuestion: 1
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }

  render() {
    const { questions } = this.props.navigation.state.params;
    const { currentQuestion } = this.state;

    return(
      <View>
        <Text>{currentQuestion} / {questions.length}</Text>
        {questions.map((question) => {
          return (
            <View>
              <FlipCard>
                <View>
                  <Text>{question.question}</Text>
                </View>
                <View>
                  <Text>{question.answer}</Text>
                </View>
              </FlipCard>
              <View>
                <TouchableOpacity>
                  <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default Quiz;