/**
 * Better Talk App
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
