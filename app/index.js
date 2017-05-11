/**
 * 入口文件
 *
 * @author: Allin.
 * @time: 2017/5/10
 */

// 引入React
import React from 'react';
import { render } from 'react-dom';

// 热更新
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

// 引入redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// 加载组件
import App from './js/container/App';

// 引入reducers
import Appstore from './js/reducers';

let store = createStore(
    Appstore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log(store.getState());
});

const renderApp = (Component) => {
    render(
        <AppContainer>
            <Provider store={ store }>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}

renderApp(App);

if (module.hot) {
    module.hot.accept('./js/container/App', () => {
        renderApp(App)
    });
}
