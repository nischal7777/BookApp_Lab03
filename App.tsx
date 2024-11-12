import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import BorrowedScreen from './screens/BorrowedScreen';
import { BorrowedBooksProvider } from './context/BorrowedBooksContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Books List" component={HomeScreen} />
      <Stack.Screen name="Book Detail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BorrowedBooksProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Borrowed" component={BorrowedScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BorrowedBooksProvider>
  );
}
