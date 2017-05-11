import { combineReducers } from 'redux';

import { TEST } from './../actions';

function test(state = 'hello redux', action) {
    switch (action.type) {
        case TEST:
            return action.payload;
        default:
            return state;
    }
};

const App = combineReducers({
    test
})

export default App;
