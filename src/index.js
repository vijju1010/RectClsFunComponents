import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App tab='home' />);

// import { ChakraProvider } from '@chakra-ui/react';
ReactDOM.render(
    // <ChakraProvider>
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // </ChakraProvider>
    document.getElementById('root')
);

reportWebVitals();
