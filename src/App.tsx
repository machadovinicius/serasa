import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './routes/Routes';
import GlobalStyle from './global.style';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppRoutes />
    </Provider>
  );
};

export default App;
