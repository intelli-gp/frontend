import Footer from '../components/Footer';
import Nav from '../components/Nav';
import BlogSection from './templates/BlogSection';
import FeaturesSection from './templates/FeaturesSection';
import Feedback from './templates/Feedback';
import HeroSection from './templates/HeroSection';
function LandingPage() {
    return (
        <div>
            <Nav />
            <div className=" flex flex-col  justify-center items-center bg-white  ">
                <HeroSection />
                <FeaturesSection />
                <BlogSection />
                <div className="w-[60%] m-auto">
                    <Feedback />
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default LandingPage;
