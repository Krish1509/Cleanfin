import First     from "../Components/Landing/1PlanForSecureFuture";
import Second from "../Components/Landing/2WhoWeAre";
import TextSlider from "../Components/Landing/3TextSlider";
import OurService from "../Components/Landing/4OurService";
import Trust from "../Components/Landing/5Trusted";
import LatestBlog from "../Components/Landing/10LatestBlog";
import WhoWeAre from "../Components/Landing/9WhoWeAre"; 
import OurProcess from "../Components/Landing/8OurProcees";
import Team from "../Components/Landing/7Team";
import OuirProject from "../Components/Landing/6OurProject"
import OurPrice from "../Components/Landing/11OurPrice";

const Home = () => {
  return (
    <div>
      <First/>
      <Second/>
      <TextSlider/>
      <OurService/>
      <Trust/>
      <OuirProject/>
      <Team/>
      <OurProcess/>
      <WhoWeAre/>
      <LatestBlog/>
      <OurPrice/>
    </div>
  )
}

export default Home;