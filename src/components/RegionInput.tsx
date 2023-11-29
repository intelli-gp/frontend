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
        <div className="flex flex-col flex-wrap max-w-xs">
            <div className="flex place-items-center	">
                <label>
                    <PhoneInput
                        country="eg"
                        value={phoneNumber}
                        onChange={handleChange}
                        inputProps={{
                            required: true,
                        }}
                    />
                </label>
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
