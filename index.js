/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider } from 'react-redux';
import store from './src/redux/redux-store';
import BackgroundFetch from "react-native-background-fetch";

let MyHeadlessTask = async () => {
    console.log('----------------------------------------------------------------------------[BackgroundFetch HeadlessTask] start');
  
    // Perform an example HTTP request.
    // Important:  await asychronous tasks when using HeadlessJS.
    let response = await fetch('https://facebook.github.io/react-native/movies.json');
    let responseJson = await response.json();
    console.log('----------------------------------------------------------------------------[BackgroundFetch HeadlessTask] response: ', responseJson);
  
    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish();
  }
  
  // Register your BackgroundFetch HeadlessTask
  

const AppProvider =()=>(<Provider store = {store}>
        <App/>
    </Provider>)
    // BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => AppProvider);

