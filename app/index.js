import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import App from './js/container/App';

const renderApp = (Component) => {
    render(
        <AppContainer>
            <Component />
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
