/* tslint:disable:no-var-requires ordered-imports */
import { AppRegistry } from 'react-native';
import { App } from './App';

AppRegistry.registerComponent('RNW', () => App);
AppRegistry.runApplication('RNW', {
  rootTag: document.getElementById('react-root'),
});
