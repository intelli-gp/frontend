import styled, { css } from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

const x =css`
.rccs__card--front, .ccs__card--back {
    box-shadow: var(--gray-shadow) !important;
    background: none !important;
    border-radius:14px !important;
}
.rccs__card {
   
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: all 0.4s linear;
    transition: all 0.4s linear;
    width: 250px;

  }
  .rccs__name {
    display:none;
  }
  .rccs__expiry__valid{
    
\
    font-size:16px;
  }
  .rccs__expiry__value{
    font-size:14px;

  }
  .rccs__expiry{

    left:10% !important;
    right:0 !important;
  }
  .rccs__issuer {
    background-position: top left  !important;
    left: 10% !important;
    top:12% !important;
  }
.rccs__chip {
    display:none !important;
}
  
`
export const CardContainer = styled.span`

${x}
`;
 
export const EditIcon =styled(BsThreeDotsVertical)`
position: absolute;
top:12%;
right:12%;
z-index:100;
color: var(--slate-500);
width:20px;
height:20px;
`
