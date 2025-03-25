import emptyIcon from "/public/images/box.png";
import PropTypes from "prop-types";
// import { Empty} from 'lucide-react'

const Empty = ({ boxHeight = "300px", imgWidth = "200px" }) => {

  return (
    <div className={`w-full flex-center`} style={{ height: boxHeight }}>
      <img src={emptyIcon} alt="emptyIcon" width={imgWidth} />
    </div>
  );
};

export default Empty;

Empty.propTypes = {
  boxHeight: PropTypes.string,
  imgWidth: PropTypes.string,
};
