import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReducerFactory from './src/redux/reducer/ReducerFactory';
import AppRoot from './src/components/AppRoot';

const store = createStore(ReducerFactory, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
        <AppRoot />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
