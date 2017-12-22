import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard} from 'react-native'
import PropTypes from 'prop-types';
import { Button,  Card,  FormInput,  FormValidationMessage } from 'react-native-elements';
import { addDeck, getDecks } from '../utils/api';
import { addDeckToState } from '../actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native'

class AddDeck extends Component {
    constructor(props) {
        super(props)
    }
    
    state = {
        title: '',
        isShowErrorMessage: false
    }

    handleSubmit = () => {
        if (this.state.title) {
            let newDeck = {title: this.state.title, questions: []}
            addDeck(newDeck);
            this.props.dispatch(addDeckToState(newDeck));
            this.props.navigation.navigate('DeckView', { deck: newDeck })
            Keyboard.dismiss();
        } else {
            this.setState({ isShowErrorMessage: true })
        }
    };


    render() {
        return (
        <KeyboardAvoidingView style={{flex: 1, alignContent: 'center'}} behavior="padding">
        <View style={{ flex: 1 }}>

            <Card title="What is the title of your new deck?" >
                 <FormInput onChangeText={title => this.setState({ title })}
                value={this.state.title}/> 

             <FormValidationMessage>
                {this.state.isShowErrorMessage ? 'This field is required': ''}
            </FormValidationMessage>
            <Button
                title="Create Deck"
                raised
                backgroundColor="black"
                onPress={this.handleSubmit}
            /> 
             </Card>  
        </View>
        </KeyboardAvoidingView>
        );
  }
}

export default connect()(AddDeck)