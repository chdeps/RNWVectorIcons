/* tslint:disable:no-var-requires ordered-imports */
import { AppRegistry } from 'react-native';
import { App } from './App';

AppRegistry.registerComponent('RNW', () => App);
AppRegistry.runApplication('RNW', {
  rootTag: document.getElementById('react-root'),
});

import iconFont from './icomoon.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Icomoon;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);
