import React from 'react';
import { KeyboardAvoidingView, Keyboard  } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import { addCardToDeck, getDeckByTitle } from '../utils/api';

export default class AddCard extends React.Component {

    state = {
        title: this.props.navigation.state.params.title, 
        question: '',
        answer: '',
        isShowQuesErrorMessage: false,
        isShowAnsErrorMessage: false
    };

    handleSubmit = () => {
        if (this.state.question) {
            if (this.state.answer) {
                let newCard = {
                    question: this.state.question,
                    answer: this.state.answer
                }
                Keyboard.dismiss();
                addCardToDeck(this.state.title, newCard).then(() => {
                    getDeckByTitle(this.state.title).then((updatedDeck)=>{
                        this.props.navigation.navigate('DeckView', { deck: updatedDeck })
                    })
                });
            }
            else {
                this.setState({ isShowAnsErrorMessage: true })
            }
        }
        else {
            this.setState({ isShowQuesErrorMessage: true })
        }
    };
    
  render() {
    return (
    <KeyboardAvoidingView style={{flex: 1, alignContent: 'center'}} behavior="padding">    
      <Card title="What is your question?">
            <FormLabel>Question:</FormLabel>
            <FormInput
                onChangeText={question => this.setState({ question })}
                value={this.state.question}
                />
                
                 <FormValidationMessage>
                {this.state.isShowQuesErrorMessage ? 'This field is required': ''}
            </FormValidationMessage>
                <FormLabel>Answer to this question:</FormLabel>
          <FormInput
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
         <FormValidationMessage>
                {this.state.isShowAnsErrorMessage ? 'This field is required': ''}
            </FormValidationMessage>
          <Button title="Save Question" raised backgroundColor="black" onPress={this.handleSubmit}/>
      </Card>
      </KeyboardAvoidingView>
    )
  }
}