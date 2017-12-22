import React, { Component } from 'react'
import { Text, View, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { Card, Button} from 'react-native-elements';
import DeckView from './DeckView'

export default class DeckItem extends React.Component {
    render(){ 
        return (
            <View style={{ flex: 1 }}>
                <Card>
                <Button  title={this.props.deck.title} backgroundColor="black"
                icon={{name: 'arrow-right', type: 'font-awesome'}} 
                 onPress={() => this.props.navigation.navigate('DeckView', { deck:this.props.deck })} />
                <Text style={{textAlign:'center'}}>{this.props.deck.questions.length} cards</Text>

                 </Card>
            </View>
        )
    }
}