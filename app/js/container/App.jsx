import React, { Component } from 'react';
import 'normalize.css';

import { connect } from 'react-redux';
import { test } from '../actions';

import HelloWorld from 'components/HelloWorld';

class App extends Component {

    render() {
        return(
            <div>
                <div>React</div>
                <HelloWorld {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state, data) => {
    return {
        test: state.test
    }
}

const mapDispatchToProps = (dispatch, data) => {
    return {
        dispatch: {
            testHello: (data) => {
                dispatch(test(data));
            }
        }
    }
}

let Root = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default Root;
