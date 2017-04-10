import React, { Component } from 'react';
import 'normalize.css';

import HelloWorld from 'components/HelloWorld';

export default class App extends Component {
    render() {
        return(
            <div>
                <div>React</div>
                <HelloWorld />
            </div>
        )
    }
}
