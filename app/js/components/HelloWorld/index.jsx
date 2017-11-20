import React, { Component } from 'react';
import './HelloWorld.css';

class HelloWorld extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch.testHello('haha')
    }
    render() {

        return <div className="hello">Hello allin</div>
    }
};

export default HelloWorld;
