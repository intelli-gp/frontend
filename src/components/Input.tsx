import classNames from 'classnames';

import {
    SerializedCustomInput,
    SerializedInput,
} from '../types/serialized-input';

type InputsGridProps = {
    inputs: Partial<SerializedCustomInput>[];
};

const commonStyles =
    'rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-1 text-[var(--gray-700)]';

/**
 * This is an actual input or textarea element with a label wrapped by a div.
 * Also, it has an error message you can pass in.
 */
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

    const wrapperClasses = classNames('flex flex-col gap-1', wrapperClassName);
    return (
        <div className={wrapperClasses}>
            <label
                htmlFor={label.toLowerCase()}
                className="font-bold text-[var(--gray-700)]"
            >
                {label}:
            </label>
            {multiline ? (
                <textarea
                    className={inputClasses}
                    placeholder={other.placeholder ?? label.toLowerCase()}
                    id={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                    {...other}
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

/**
 * This is an actual input or textarea element `without` a label  and wrapped by a div.
 * Also, it has an error message you can pass in.
 */
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
    const wrapperClasses = classNames(
        'flex flex-col gap-1 w-full',
        wrapperClassName,
    );

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

/**
 * This is a grid of inputs. It takes an array of inputs and renders them in a grid.
 */
export const InputsGrid = ({ inputs }: InputsGridProps) => {
    return (
        <div className="grid grid-col-4 lg:grid-cols-5 gap-y-4 g-x-1 items-center">
            {inputs.map(({ label, custom, customComponent, ...other }) => (
                <>
                    <label
                        htmlFor={label?.toLowerCase()}
                        className="col-start-1 max-w-[90%] text-slate-700"
                    >
                        {label}
                    </label>
                    <div className="col-start-2 col-span-3" key={label}>
                        {custom ? (
                            customComponent
                        ) : (
                            <InputWithoutLabel
                                id={label?.toLowerCase()}
                                {...other}
                            />
                        )}
                    </div>
                </>
            ))}
        </div>
    );
};
