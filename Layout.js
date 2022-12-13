import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul className = "Layout">
          <li className = "listOption">
            <Link to="/" className = "pageLink" >Home</Link>
          </li>
          <li className = "listOption">
            <Link to="/AddPlayer" className = "pageLink" >Add a Player</Link>
          </li>
          <li className = "listOption">
            <Link to="/MoreStats" className = "pageLink" >More Stats</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;