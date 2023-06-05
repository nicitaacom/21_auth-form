import { navLinks } from "../../constant";
import { Link } from 'react-router-dom';

export function Navbar () {
return (
<div className="navbar">
  <img src="./logo.png"/>

  <ul className="nav-links">
    {navLinks.map(navLink => (
     <Link className='li-item' to={navLink.to} key={navLink.id}>{navLink.title}</Link>	  
	 ))}
  </ul>
</div>
)
}