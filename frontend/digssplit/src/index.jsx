import React from 'react';
import ReactDOM from 'react-dom';
import Digssplit from './Digssplit';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

ReactDOM.render(<Digssplit />, document.getElementById('root'));
