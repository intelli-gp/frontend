import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 25px 55px 0px 55px;
    @media (max-width: 768px) {

        padding: 25px 45px 0px 45px;

    }
`;
export const GroupCoverImageContainer = styled.div`
    position: relative;

    div{
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        left: 57px;
        top: 135px;
        
    }
    @media (max-width: 768px) {
        div{
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 15px;
            left: 47px;
            top: 155px;
            
        }
    }

`;
export const PictureOverlay = styled.img`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    &:hover {
        opacity: 0.2;
        cursor: pointer;
    }
`;
export const GroupCoverImage = styled.img`

    object-fit: cover;
    object-position: center;
    max-height: 310px;
    width: 100%;
    height: 100%;
    border-radius: 40px 40px 6px 6px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
	box-shadow: 14px 37px 45.9px rgba(49, 46, 129, 0.19);

    @media (max-width: 768px) {
        max-height: 300px;
        border-radius: 30px 30px 5px 5px;

    }

`;