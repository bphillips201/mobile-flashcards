import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Text, Card, Button } from 'react-native-elements'
import { blue, red } from '../utils/colors';
import { AppLoading } from 'expo';
import FlipCard from 'react-native-flip-card';

class Quiz extends Component {
  state = {
    ready: false,
    questions: [],
    currentQuestion: {},
    currentQuestionNumber: 1,
    correctAnswers: 0,
    opacity: new Animated.Value(0)
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }

  componentDidMount () {
    this.initQuiz();
  }

  initQuiz = () => {
    const { opacity } = this.state;
    const { questions } = this.props.navigation.state.params;

    this.setState({
      questions,
      currentQuestion: questions[0],
      currentQuestionNumber: 1,
      correctAnswers: 0,
      ready: true
    })

    Animated.timing(opacity, { toValue: 1, duration: 300, delay: 250 }).start();
  }

  nextCard = (isCorrect) => {
    const { opacity, currentQuestion, currentQuestionNumber, questions } = this.state;

    if (isCorrect) {
      this.setState((prevState) => {
        return { correctAnswers: prevState.correctAnswers + 1 }
      })
    }

    Animated.timing(opacity, { toValue: 0, duration: 300 }).start(() => {
      if (questions.length >= currentQuestionNumber) {
        this.setState((prevState) => {
          return { 
            currentQuestionNumber: prevState.currentQuestionNumber + 1,
            currentQuestion: questions[prevState.currentQuestionNumber]
          }
        });
        
        Animated.timing(opacity, { toValue: 1, duration: 300 }).start()
      }
    });

  }

  render() {
    const { questions } = this.props.navigation.state.params;
    const { currentQuestion, currentQuestionNumber, correctAnswers, opacity, ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return(
      <View style={styles.container}>
        {questions.length < currentQuestionNumber
          ? <View style={styles.results}>
              <Text h3 style={styles.resultsText}>Results</Text>
              <Text h4 style={styles.resultsText}>Your score: {correctAnswers} out of {questions.length}</Text>
              <Button 
                backgroundColor={blue}
                large
                title="Start Over"
                buttonStyle={{marginTop: 15}}
                onPress={() => this.initQuiz()}
              />
              <Button 
                title="End Quiz"
                large
                buttonStyle={{marginTop: 15}}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
              />
            </View>
          : <View>
              <Text h4 style={{margin: 15}}>{currentQuestionNumber} / {questions.length}</Text>
              <Animated.View style={[{opacity}]}>
                <FlipCard 
                  friction={6}
                  style={styles.flipCard}
                  perspective={1000}
                  flipHorizontal={true}
                  flipVertical={false}
                >
                  <View style={styles.face}>
                    <Text h5 style={{color: red}}>Question</Text>
                    <Text h4>{currentQuestion.question}</Text>
                  </View>
                  <View style={styles.face}>
                    <Text h5 style={{color: red}}>Answer</Text>
                    <Text h4>{currentQuestion.answer}</Text>
                  </View>
                </FlipCard>
                <View>
                  <Button 
                    backgroundColor={blue}
                    title="Correct"
                    buttonStyle={{marginTop: 15}}
                    onPress={() => this.nextCard(true)}
                  />
                  <Button 
                    backgroundColor={red}
                    title="Incorrect"
                    buttonStyle={{marginTop: 15}}
                    onPress={() => this.nextCard(false)}
                  />
                </View>
              </Animated.View>
            </View> 
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  results: {
    justifyContent: 'center',
  },
  resultsText: {
    alignItems: 'center',
    margin: 15
  },
  flipCard: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    flexBasis: 250,
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