import { Provider } from 'react-redux';
import { store } from '../app/store/store';

const App = ({ Component, pageProps }:any) => {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  };

export default App;