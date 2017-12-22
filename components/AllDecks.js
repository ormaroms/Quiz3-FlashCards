import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableNativeFeedback, ScrollView  } from 'react-native'
import { Button,  Card } from 'react-native-elements';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions/index';
import DeckView from './DeckView'
import DeckItem from './DeckItem'
import { getDecks } from '../utils/api';

 class AllDecks extends React.Component {
    componentDidMount() {
        this.props.getAllDecks();
    }
    
    componentDidUpdate() {
        this.props.getAllDecks();
    }

    renderItem = (item) => {
        let actualItem = item.item
        return <DeckItem navigation={this.props.navigation} deck={actualItem} key={actualItem.title}  />
    }
   
    render() {
        return (
            <ScrollView> 
        <View style={{ flex: 1 }}>
            <Card title="All Decks" >
               <FlatList data={this.props.allDecks} renderItem={this.renderItem} />
             </Card> 
        </View>
        </ScrollView> 
        )
    }
}

const mapStateToProps = state => {
  const allDecks = state;
  return { allDecks };
};

export default connect(mapStateToProps, { getAllDecks })(AllDecks);

