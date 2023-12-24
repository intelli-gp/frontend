type InputProps = {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
} & Record<string, any>;

export default function Input({
    label,
    value,
    type,
    placeholder,
    onChange,
    error,
    ...other
}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="font-bold">
                {label}:
            </label>
            <input
                className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                type={type ?? 'text'}
                placeholder={placeholder ?? label}
                id={label}
                value={value}
                onChange={onChange}
                {...other}
            />
            {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
    );
}
