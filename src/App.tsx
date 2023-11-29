import { useState } from 'react';

import './App.css';
import Button from './components/Button';
import MobileInput from './components/RegionInput';

import DateInput from './components/DateInput';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <Button>Create</Button>
            <Button select="primary500" styles={'hover:bg-pink-700'}>
                Create
            </Button>
            <MobileInput />
            <DateInput />
        </div>
    );
}

export default App;
