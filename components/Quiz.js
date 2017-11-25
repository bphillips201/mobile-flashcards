import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Text, Card, Button } from 'react-native-elements'
import { blue, red } from '../utils/colors';

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
      <View style={styles.container}>
        <Text h4 style={{margin: 15}}>{currentQuestion} / {questions.length}</Text>
        {questions.map((question) => {
          return (
            <View key={question.question}>
              <FlipCard 
                friction={6}
                style={styles.flipCard}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
              >
                <View style={styles.face}>
                  <Text h4>{question.question}</Text>
                </View>
                <View style={styles.face}>
                  <Text h4>{question.answer}</Text>
                </View>
              </FlipCard>
              <View>
                <Button 
                  backgroundColor={blue}
                  title="Correct"
                  buttonStyle={{marginTop: 15}}
                />
                <Button 
                  backgroundColor={red}
                  title="Incorrect"
                  buttonStyle={{marginTop: 15}}
                />
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  flipCard: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    flexBasis: 200,
    backgroundColor: 'white'
  },
  face: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Quiz;