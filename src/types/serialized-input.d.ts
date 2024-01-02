export type SerializedInput = {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    multiline?: boolean;
    error?: string;
} & Record<string, any>;
