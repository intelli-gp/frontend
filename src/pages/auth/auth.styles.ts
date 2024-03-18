import styled from "styled-components";
import { FcGoogle } from 'react-icons/fc';
import Button from "../../components/button/button.component";

export const FormContainer = styled.form`
   display: flex; 
   flex-direction:column;
   gap:1rem;
   width: 20rem;
   padding: 2rem 0;
 
   @media (min-width: 640px) {
     width: 25rem !important;
   }

`;
export const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  height: 2.75rem;
  padding: 0.5rem 0;
  width: 100%;
`;

export const GoogleLoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  height: 2.75rem;
  padding: 0.5rem 0;
  width: 100%;
`;

export const GoogleIcon = styled(FcGoogle)`
  padding: 1px;
  height:20px;
  width:20px;
  border-radius: 50%;
  background-color: white;
`;

export const GoogleLoginLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
`;

export const PasswordContainer =styled.div`
display: flex;
gap: 0.5rem;
width: 100%;
justify-content: space-between;

@media (max-width: 767px) {
  flex-direction: column;
}
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;

  @media (min-width: 1024px) {
    width: 60%;
  }
`;