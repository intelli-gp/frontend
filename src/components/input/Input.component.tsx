import _ from 'lodash';
import { useState } from 'react';
import { v4 } from 'uuid';

import {
    SerializedCustomInput,
    SerializedInput,
} from '../../types/serialized-input';
import {
    Input,
    InputWithLabelWrapper,
    Label,
    TextAreaContainer,
    TextAreaCounter,
    Textarea,
} from './input.styles';

type InputsGridProps = {
    inputs: Partial<SerializedCustomInput>[];
};

export const CustomInput = ({
    label,
    value,
    limit,
    onChange,
    error,
    className,
    wrapperClassName,
    multiline,
    ...other
}: SerializedInput) => {
    const [textAreaCounter, setTextAreaCounter] = useState(0);
    const id = _.kebabCase(label ?? v4());
    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setTextAreaCounter(e.target.value.length);
        onChange(e);
    };
    return (
        <InputWithLabelWrapper className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}:</Label>}
            {multiline ? (
                <TextAreaContainer>
                    <Textarea
                        className={className}
                        placeholder={other.placeholder ?? label?.toLowerCase()}
                        id={id}
                        value={value}
                        onChange={handleTextAreaChange}
                        {...other}
                    />
                    {limit && (
                        <TextAreaCounter>
                            {textAreaCounter}/{limit}
                        </TextAreaCounter>
                    )}
                </TextAreaContainer>
            ) : (
                <Input
                    className={className}
                    placeholder={other.placeholder ?? label?.toLowerCase()}
                    id={id}
                    value={value}
                    onChange={onChange}
                    {...other}
                />
            )}

            {error && <span className="text-red-600 text-sm">{error}</span>}
        </InputWithLabelWrapper>
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
                            <CustomInput id={label?.toLowerCase()} {...other} />
                        )}
                    </div>
                </>
            ))}
        </div>
    );
};
