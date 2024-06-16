import { useEffect } from 'react';

export const AIServicePage = () => {
    useEffect(() => {
        document.title = 'AI Service | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    return <div>AIServicePage</div>;
};
