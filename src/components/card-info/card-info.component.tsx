import { CardContainer, EditIcon } from "./card-info.style";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


type CardInfoProps = {
    number:string; 
    expiry: string; 
    cvc?: string; 
    name?: string; 
}

const CardInfo = (
{ number,
    expiry,
    cvc,
    name
}:CardInfoProps
) => {
    // const state = {
    //     number: '53**********4242', 
    //     expiry: '12/25',
    //     cvc: '123', 
    //     name: 'John Doe', 
    // };

    return (
        <CardContainer>
            <div className="relative">
                <EditIcon />
                <Cards
                    number={number}
                    expiry={expiry}
                    cvc={cvc||''}
                    name={name||''}
                />
                
            </div>
        </CardContainer>

    );
}
export default CardInfo;