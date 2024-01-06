import {
    HTMLAttributes,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';

export type SerializedInput = {
    label: string;
    value: string;
    wrapperClassName?: string;
    multiline?: boolean;
    error?: string;
} & InputHTMLAttributes &
    TextareaHTMLAttributes;

type customInputOptional = {
    custom?: boolean;
    customComponent?: React.ReactNode;
};
type customInputMandatory = {
    custom: boolean;
    customComponent: React.ReactNode;
};

/**
 * This type assure that custom and component are both present or both absent.
 */
export type SerializedCustomInput = SerializedInput &
    (customInputOptional | customInputMandatory);
