import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import HelloWorld from './js/components/HelloWorld';

const hotRender = (Component) => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    )
}

hotRender(HelloWorld);

if (module.hot) {
    module.hot.accept('./js/components/HelloWorld', () => {
        hotRender(HelloWorld)
    });
}
