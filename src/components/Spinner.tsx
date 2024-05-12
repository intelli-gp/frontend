import classNames from 'classnames';
import { GridLoader } from 'react-spinners';

type SpinnerProps = {
    /**
     * If true, spinner will take full height of the screen (100vh)
     * @default true
     */
    fullHeight?: boolean;
};
const Spinner = ({ fullHeight = true }: SpinnerProps) => {
    const className = classNames('flex items-center justify-center', {
        'h-full': fullHeight,
    });
    return (
        <div className={className}>
            <GridLoader color="var(--indigo-700)" size={14} />
        </div>
    );
};

export default Spinner;
