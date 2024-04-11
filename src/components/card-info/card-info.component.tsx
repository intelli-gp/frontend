import { CardContainer, EditIcon } from "./card-info.style";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


// type CardInfoProps = {
//     Type: string;
//     Number: number;
//     Date: string;
// }

const CardInfo = () => {
    const state = {
        number: '53**********4242', 
        expiry: '12/25',
        cvc: '123', 
        name: 'John Doe', 
    };

    return (
        <CardContainer>
            <div className="relative">
                <EditIcon />
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                />
                
            </div>
        </CardContainer>

    );
}
export default CardInfo;