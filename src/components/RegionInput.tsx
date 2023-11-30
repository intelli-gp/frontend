import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function MobileInput(): JSX.Element {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);

    const handleChange = (value: string): void => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));
    };

    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

        return phoneNumberPattern.test(phoneNumber);
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
                            borderColor: '#64748b',
                        }}
                        buttonStyle={{
                            height: '43.6px',
                            borderColor: '#64748b',
                        }}
                        value={phoneNumber}
                        onChange={handleChange}
                        inputProps={{
                            required: true,
                        }}
                    />
                </div>
            </div>
            {!valid && (
                <p className="text-xs text-txt">
                    Please enter a valid phone number.
                </p>
            )}
        </div>
    );
}

export default MobileInput;
