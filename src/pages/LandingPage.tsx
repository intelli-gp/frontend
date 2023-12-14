import Nav from './landingPage/Nav';
import Hero from './landingPage/HeroSection';
import FeatureSection from './landingPage/FeatureSection';
import Feedback from './landingPage/FeedbackSection';
import Footer from './landingPage/Footer';
import BlogSection from './landingPage/BlogSection';
function LandingPage() {
    return (
        <div>
            <Nav />
            <div className=" flex flex-col  justify-center items-center bg-white   h-[calc(100vh - 53px)]">
                <Hero />
                <FeatureSection />
                <BlogSection />
                <Feedback />
            </div>
            <Footer />
        </div>
    );
}
export default LandingPage;
