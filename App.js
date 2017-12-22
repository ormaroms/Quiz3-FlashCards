import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AddDeck from './components/AddDeck'
import AllDecks from './components/AllDecks'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import { createStore, applyMiddleware } from 'redux'
import { setLocalNotification } from './utils/helpers';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers'

function DecksAppStatusBar ({ backgroundColor, ...props}) {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const Tabs = TabNavigator({
  AllDecks: {
    screen: AllDecks,
    navigationOptions: {
      tabBarLabel: 'All Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ion-navicon-round" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ion-plus-round" size={30} color={tintColor} />
    }
  }
})

const Stack = StackNavigator({
  AllDecks: {
      screen: Tabs,
      navigationOptions: {
      title: "FlashDecks App",
       headerStyle: {backgroundColor: "black"},
       headerTintColor: "white"
      }
    },
  AddDeck: {
      screen: AddDeck,
      navigationOptions: {
      title: "Add a Deck",
       headerStyle: {backgroundColor: "black"},
       headerTintColor: "white"
      }
  },
  DeckView: {
      screen: DeckView,
      navigationOptions: {
      title: "View Of Deck",
       headerStyle: {backgroundColor: "black"},
       headerTintColor: "white"
      }
  },
  AddCard: {
      screen: AddCard,
      navigationOptions: {
      title: "Add a question",
       headerStyle: {backgroundColor: "black"},
       headerTintColor: "white"
      }
  },
     QuizView: {
      screen: QuizView,
      navigationOptions: {
      title: "View of Quiz",
       headerStyle: {backgroundColor: "black"},
       headerTintColor: "white"
      }
  }
})

 const middleware = applyMiddleware(promise())

export default class App extends React.Component {
componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
       <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
           <DecksAppStatusBar backgroundColor='black' barStyle='light-content'/>  
          <Stack />
      </View>
       </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
