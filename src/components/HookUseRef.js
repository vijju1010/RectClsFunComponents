import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
    const ip1 = useRef();
    const ip0 = useRef();

    useEffect(() => {
        
    }, [ip0, ip1]);

    return (
        <>
            <input type='text' name='fname' ref={ip0} />
            <input type='text' name='lnamd' ref={ip1} />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
