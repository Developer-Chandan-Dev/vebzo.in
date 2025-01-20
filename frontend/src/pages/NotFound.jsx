import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <Link to="/"><p>Go To Home</p></Link>
    </div>
  );
};

export default NotFound;
