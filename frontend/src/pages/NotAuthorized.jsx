import { Link } from "react-router-dom"

const NotAuthorized = () => {
  return (
    <div>
      <h1>Not Authorized</h1>
      <Link to="/"><p>Go To Home</p></Link>
    </div>
  )
}

export default NotAuthorized
