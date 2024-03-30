import _ from 'lodash';
import { useState } from 'react';
import { v4 } from 'uuid';

import {
    SerializedCustomInput,
    SerializedInput,
} from '../../types/serialized-input';
import {
    GridContainer,
    Input,
    Label,
    TextAreaContainer,
    Textarea,
    TextareaCounter,
    Wrapper,
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
    const [textAreaCounter, setTextAreaCounter] = useState(value?.length ?? 0);
    const id = _.kebabCase(label ?? v4());
    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setTextAreaCounter(e.target.value.length);
        onChange(e);
    };
    return (
        <Wrapper className={wrapperClassName}>
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
                        <TextareaCounter>
                            {textAreaCounter}/{limit}
                        </TextareaCounter>
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
        </Wrapper>
    );
};

/**
 * This is a grid of inputs. It takes an array of inputs and renders them in a grid.
 */
export const InputsGrid = ({ inputs }: InputsGridProps) => {
    return (
        <GridContainer>
            {inputs.map(({ label, custom, customComponent, ...other }) => (
                <>
                    <Label htmlFor={label?.toLowerCase()}>{label}</Label>
                    <div key={label}>
                        {custom ? (
                            customComponent
                        ) : (
                            <CustomInput
                                id={_.kebabCase(label ?? v4())}
                                {...other}
                            />
                        )}
                    </div>
                </>
            ))}
        </GridContainer>
    );
};
