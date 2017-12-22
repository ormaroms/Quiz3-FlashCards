import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteDeckByTitle, getDecks } from '../utils/api';

export default class DeckView extends React.Component {


    handleDelete = () => {
        deleteDeckByTitle(this.props.navigation.state.params.deck.title).then(() => {
            this.props.navigation.navigate('AllDecks')
        })
    };

      render() {
    return (
      <View style={{
          flex: 1,
          alignContent: 'center'
        }}
      >
     <Card title={this.props.navigation.state.params.deck.title}>
        <Text style={{marginBottom: 10, textAlign: 'center'}}>
            { this.props.navigation.state.params.deck.questions.length } cards
          </Text>

           <View>
            <Button buttonStyle={[styles.button, styles.greenBg]} title='Add Card' icon={{name: 'plus', type: 'font-awesome'}} 
              onPress={() => {  this.props.navigation.navigate('AddCard', { title: this.props.navigation.state.params.deck.title }) }
              }
            />
          </View>
          <View>
            <Button buttonStyle={[styles.button, styles.blueBg]} backgroundColor='black' title='Start Quiz' icon={{name: 'play', type: 'font-awesome'}} 
              onPress={() => {
                  this.props.navigation.navigate('QuizView', { deck: this.props.navigation.state.params.deck });
                }
              }
            />
          </View>
          <View>
            <Button buttonStyle={[styles.button, styles.redBg]} title='Delete Deck' icon={{name: 'remove', type: 'font-awesome'}}  onPress={this.handleDelete}/>
          </View>
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
  },
  blueBg: {
      backgroundColor: 'blue'
  }
});
