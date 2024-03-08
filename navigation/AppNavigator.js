// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#6a1b9a',
      inactiveTintColor: '#666',
    }}
  >
    <Tab.Screen
      name="Tarefas"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Tarefas',
        tabBarIcon: ({ color }) => <MaterialIcons name="list" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome" headerMode="none">
    <Stack.Screen name="Bem-vindo" component={WelcomeScreen} />
    <Stack.Screen name="Home" component={TabNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
