import { GridLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <GridLoader color="var(--indigo-700)" size={14} />
        </div>
    );
};

export default Spinner;
