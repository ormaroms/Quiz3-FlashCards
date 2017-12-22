import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  Badge,
  Button,
  Card
} from 'react-native-elements';
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

export default class QuizView extends React.Component {
    notificationReset(){
        clearLocalNotifications().then(setLocalNotification)
    }
   state = {
        questions: this.props.navigation.state.params.deck.questions,
        questionIndex: 0,
        isShowAnswer: false,
        correctAnswers: 0
  }

  resetState(){
    this.setState(()=>{
      return{
        questions: this.props.navigation.state.params.deck.questions,
        questionIndex: 0,
        isShowAnswer: false,
        correctAnswers: 0
    }})
      this.notificationReset();
  }

  questionsView() {
    if (this.state.questionIndex < this.state.questions.length) {
      return (
             <View>
        <Card
          title={
            this.state.isShowAnswer
              ? ('ANSWER: ' + this.state.questions[this.state.questionIndex].answer)
              : ('QUESTION: ' + this.state.questions[this.state.questionIndex].question)
          } >
     
          <View>
            <Button title= {this.state.isShowAnswer ? "Show Question" : "Show Answer"}
               onPress={() => this.setState({ isShowAnswer: !this.state.isShowAnswer })}
               buttonStyle={{marginBottom: 50, borderRadius:10}}/> 
          </View>

          <View>
              <Button title="Corrent" buttonStyle={[styles.button, styles.greenBg]} icon={{name: 'check', type: 'font-awesome'}}
               onPress={() => {this.setState({ questionIndex: this.state.questionIndex + 1, 
               correctAnswers: this.state.correctAnswers + 1,
               isShowAnswer: !this.state.isShowAnswer})}}/>
              <Button title="Incorrect" buttonStyle={[styles.button, styles.redBg]} icon={{name: 'remove', type: 'font-awesome'}}
               onPress={() => {this.setState({ questionIndex: this.state.questionIndex + 1, isShowAnswer: !this.state.isShowAnswer})}}/>
          </View>
        </Card>
         <Text style={{textAlign:'right'}}>
              {this.state.questionIndex + 1 + '/' + this.state.questions.length + ' questions'}
            </Text>
         </View>
      );
    }

    if (this.state.questions.length == 0) {
     return (
      <View>
        <Text style={{marginBottom: 10}}>This quiz have no question yet</Text>
         <Button title="Add card to this quiz"
         onPress={() => {this.props.navigation.navigate('AddCard', { title: this.props.navigation.state.params.deck.title })}}
          buttonStyle={styles.button}/> 
      </ View>
  );
    }
    else {
    return (

      <View>
        <Text>You have finished the quiz!</Text>
        <Text style={{marginBottom: 10}}>You answererd {this.state.correctAnswers} from {this.state.questions.length} questions correctly :)</Text>
        <Button title="Choose another quiz" onPress={() => {
          this.notificationReset()
          this.props.navigation.navigate('AllDecks')}} buttonStyle={styles.button}/>
        <Button title="Restart Quiz" onPress={() => {
          this.resetState()}} buttonStyle={styles.button}/>
          <Button title="Back to deck" onPress={() => {
          this.resetState()
          this.props.navigation.dispatch(NavigationActions.back())}} buttonStyle={styles.button}/>
      </View>
    ); }
  }

    render() {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center'
        }}
      >
     <Card title={'Quiz:' + this.props.navigation.state.params.deck.title}>
         {this.questionsView()}
     </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius:10,
  },
    redBg: {
        backgroundColor: 'red'
    },
    greenBg: {
        backgroundColor: 'green'
    }
});
    