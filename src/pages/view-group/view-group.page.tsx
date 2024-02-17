import { PageContainer, GroupCoverImage, GroupCoverImageContainer, PictureOverlay } from "./view-group.styles";
import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import coverImageCamera from '../../assets/imgs/coverImageCamera.png';


const ViewGroupPage = () => {

    const data = {
        
            title: 'Computer Hackers',
            description: 'Lorem ipsum dolor sit amet consectetur. Ultrices luctus mi euismod sit quam pulvinar. Eu platea sit aliquam in egestas at volutpat netus. In massa aliquet semper etiam tempor cras hac sit imperdiet. Ornare risus nisl sit vulputate et rhoncus non. Amet libero scelerisque odio aliquet. At sed turpis sollicitudin tortor odio velit. Cursus nunc aliquam odio malesuada in et quis et volutpat. Sit sed viverra metus lorem cursus varius. Aliquam posuere malesuada nunc eleifend amet netus massa ut.',
            cover_image_url: '',
            group_tag: ['programming', 'networking', 'web-dev'],
            admins: ['user1', 'user2'],
            members: ['user0', 'user1', 'user2', 'user3'],
            membersno: '4'

    };


    return (
        <PageContainer>
            <GroupCoverImageContainer>
            <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        className="!rounded-none"
                    />
                <GroupCoverImage
                    src={defaultCoverImage}
                />
                <div>
                    <h1 className="lg:text-5xl text-3xl text-white">
                    {data.title}
                    </h1>
                    <p className="lg:text-2xl text-lg text-white">
                        {data.membersno+' Members'}
                    </p>
                </div>
        </GroupCoverImageContainer>
        </PageContainer >
    );
};

export default ViewGroupPage;