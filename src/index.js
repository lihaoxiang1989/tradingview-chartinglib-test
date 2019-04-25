import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

console.log(window.TradingView.version())

ReactDOM.render(
	React.createElement(App),
	document.getElementById('root')
);
