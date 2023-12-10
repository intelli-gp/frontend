type InputProps = {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type?: string;
    required?: boolean;
    error?: string;
};

export default function Input({
    label,
    value,
    type,
    onChange,
    required,
    error,
}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="font-bold">
                {label}:
            </label>
            <input
                className="rounded border border-slate-500 p-2 min-w-0"
                type={type ?? 'text'}
                placeholder={label}
                id={label}
                value={value}
                onChange={onChange}
                required={required ?? false}
            />
            {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
    );
}
