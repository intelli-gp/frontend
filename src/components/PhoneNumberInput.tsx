import { ChangeEvent, useState } from 'react';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type PhoneInputProps = {
    value: string;
    onChange: (value: string) => void;
};

function PhoneNumberInput({ value, onChange }: PhoneInputProps): JSX.Element {
    const [valid, setValid] = useState(true);

    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneNumberPattern = /^[1-9]\d{1,14}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    const handleChange = (
        value: string,
        _data: CountryData,
        e: ChangeEvent<HTMLInputElement>,
        _formattedValue: string,
    ) => {
        setValid(validatePhoneNumber(value));
        onChange(value);
    };

    return (
        <div className="flex flex-col  gap-2">
            <label htmlFor="Phone Number" className="font-bold">
                Phone Number:
            </label>
            <div className="flex">
                <div className="flex w-full">
                    <PhoneInput
                        country="eg"
                        inputStyle={{
                            width: '100%',
                            height: '43.6px',
                            fontWeight: 'normal',
                            fontFamily: 'Lato',
                            borderColor: '#64748b',
                        }}
                        buttonStyle={{
                            height: '43.6px',
                            borderColor: '#64748b',
                        }}
                        value={value}
                        onChange={handleChange}
                        inputProps={{
                            required: true,
                        }}
                        defaultMask="... ... ... ...."
                    />
                </div>
            </div>
            {!valid && (
                <p className="text-xs text-red-700">
                    Please enter a valid phone number.
                </p>
            )}
        </div>
    );
}

export default PhoneNumberInput;
