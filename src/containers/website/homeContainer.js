import PropTypes from "prop-types";
import Banner from "../../components/website/home/Banner";
import ForumHome from "../../components/website/home/ForumHome";
import Infomation from "../../components/website/home/Infomation";
import SlidePage from "../../components/website/home/SlidePage";


const HomeContainer = (props) => {
  return (
    <>
      <Banner />
      <Infomation />
      <SlidePage />
      <ForumHome />
    </>
  );
};

HomeContainer.propTypes = {
  default: PropTypes.object,
};

export default HomeContainer;
