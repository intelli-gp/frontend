
import { ChangeEvent, useState } from 'react';
import { CustomInput } from './input/Input.component';
import { Modal } from './modal/modal.component';
import Button from './button/button.component';
import { useCreditCardValidator } from 'react-creditcard-validator';
import { Input, Label } from './input/input.styles';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCardModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
}) => {
    const [holderName, setHolderName] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVV, setCVV] = useState('');

    function expDateValidate(month: string, year: string) {
        console.log(month);
        if (Number(year) > 2035) {
            return 'Year cannot be greater than 2035';
        }
        return;
    }

    const {
        getCardNumberProps,
        getCVCProps,
        getExpiryDateProps,
        meta: { erroredInputs }
    } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

    const handleCardDisplay = () => {
        const rawText = [...creditCardNumber.split(' ').join('')]
        const creditCard: string[] = []
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ')
            creditCard.push(t)
        })
        return creditCard.join('')
    }
    const expriy_format = () => {
        const expdate = expiryDate;
        const expDateFormatter =
            expdate.replace(/\//g, "").substring(0, 2) +
            (expdate.length > 2 ? "/" : "") +
            expdate.replace(/\//g, "").substring(2, 4);

        return expDateFormatter;
    };
    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            title={'Add Payment Method'}
            width="md"
        >
            <form className="flex flex-col gap-4 p-2 py-2">
                <CustomInput
                    label={'Card Holder Name'}
                    placeholder={'Card holder name'}
                    value={holderName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setHolderName(e.target.value)
                    }

                />
                <CustomInput
                    {...getCardNumberProps()}
                    label={'Card Number'}
                    maxlength="19"
                    value={handleCardDisplay()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCreditCardNumber(e.target.value)
                    }
                    error={erroredInputs.cardNumber}
                />


                <div className='flex flex-row justify-between gap-6'>
                    <div className='flex flex-col w-full'>
                        <Label>  Expiry Date</Label>
                        <Input
                            {...getExpiryDateProps()}
                            value={expriy_format()}

                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setExpiryDate(e.target.value)
                            }
                        />
                        <span className="text-red-600 text-sm">{erroredInputs.expiryDate && erroredInputs.expiryDate}</span>
                    </div>
                    <div className='flex flex-col w-full'>
                        <Label>  CVV/CVC</Label>
                        <Input
                            {...getCVCProps()}
                            value={CVV}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCVV(e.target.value)
                            }
                        />
                        <span className="text-red-600 text-sm">{erroredInputs.cvc && erroredInputs.cvc}</span>
                    </div>


                </div>
                <div className='flex flex-row justify-end gap-4 mt-4'>
                    <Button
                        type='submit'
                        className="w-[28%]"
                    >
                        Add Card
                    </Button>
                    <Button
                        select="danger"
                        outline={true}
                        onClick={() => setShowModal(false)}
                        className="w-[28%]"

                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
export default CreditCardModal;
