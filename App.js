import React, { Fragment, Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeckDashboard from './components/DeckDashboard';
import AddDeck from './components/AddDeck';
import Quiz from './components/Quiz';
import Constants from "expo-constants";
import { MaterialIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import { setLocalNotifications } from './utils/notifications';
import { clearAsyncStorage } from './utils/api';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MobileFlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

function stackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DeckDashboard}
        options={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white'
        }}
      />
      <Stack.Screen name="Deck" component={Deck}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white'
        })}
      />
      <Stack.Screen name="AddCard" component={AddCard}
        options={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white',
          title: 'Add Card'
        }}
      />
      <Stack.Screen name="Quiz" component={Quiz}
        options={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white',
          title: 'Quiz'
        }}
      />
    </Stack.Navigator>
  );
}

function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Decks') {
              iconName = 'layers'
              color = focused ? 'purple' : 'black'
            } else {
              iconName = 'add-box';
              color = focused ? 'purple' : 'black'
            }

            return <MaterialIcons name={iconName} color={color} size={30} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 14
          }
        }}
      >
        <Tab.Screen name="Decks" component={stackNavigation} />
        <Tab.Screen name="Add Deck" component={AddDeck}
          options={{
            tabBarLabel: 'Add Deck'

          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default class App extends Component {

  componentDidMount() {
    setLocalNotifications()
  }


  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <Fragment>
          <MobileFlashCardStatusBar backgroundColor='purple' translucent />
          <MainNavigation />
        </Fragment>
      </Provider>
    )
  }
}
