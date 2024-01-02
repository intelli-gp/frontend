import classNames from 'classnames';

import { SerializedInput } from '../types/serialized-input';

const commonStyles =
    'rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2';

export const InputWithLabel = ({
    label,
    value,
    onChange,
    error,
    className,
    wrapperClassName,
    multiline,
    ...other
}: SerializedInput) => {
    const inputClasses = classNames(commonStyles, className, {
        '!outline-red-600 border-red-600': error,
    });

    const wrapperClasses = classNames('flex flex-col gap-2', wrapperClassName);
    return (
        <div className={wrapperClasses}>
            <label htmlFor={label.toLowerCase()} className="font-bold">
                {label}:
            </label>
            {multiline ? (
                <textarea
                    className={inputClasses}
                    placeholder={other.placeholder ?? label.toLowerCase()}
                    id={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={inputClasses}
                    placeholder={other.placeholder ?? label.toLowerCase()}
                    id={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                    {...other}
                />
            )}

            {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
    );
};

export const InputWithoutLabel = ({
    value,
    error,
    className,
    wrapperClassName,
    multiline,
    ...other
}: Partial<SerializedInput>) => {
    const inputClasses = classNames(commonStyles, className, {
        '!outline-red-600': error,
    });
    const wrapperClasses = classNames('flex flex-col gap-1', wrapperClassName);

    return (
        <div className={wrapperClasses}>
            {multiline ? (
                <textarea className={inputClasses} value={value} {...other} />
            ) : (
                <input className={inputClasses} value={value} {...other} />
            )}

            {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
    );
};

type InputsGridProps = {
    inputs: Partial<SerializedInput>[];
};

export const InputsGrid = ({ inputs }: InputsGridProps) => {
    return (
        <div className="grid grid-col-4 lg:grid-cols-5 gap-y-4 g-x-1 items-center">
            {inputs.map(({ label, ...other }) => (
                <>
                    <label
                        htmlFor={label?.toLowerCase()}
                        className="col-start-1"
                    >
                        {label}
                    </label>
                    <InputWithoutLabel
                        key={label}
                        id={label?.toLowerCase()}
                        wrapperClassName="col-start-2 col-span-3"
                        {...other}
                    />
                </>
            ))}
        </div>
    );
};
