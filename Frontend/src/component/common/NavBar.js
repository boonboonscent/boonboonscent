import '../../styles/NavBar.css';
import { PureComponent } from "react";
import {NavLink} from "react-router-dom";

class NavBar extends PureComponent {
    render() {
        return (
            <ul className='navbar'>
                <li className='navbar-item'>
                    <NavLink exact to='/' className={isActive => isActive ? 'navbar-link' : 'inactive navbar-link'}>투데이</NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink exact to='/perfume' className={isActive => isActive ? 'navbar-link' : 'inactive navbar-link'}>전체 향수</NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink exact to='/notes' className={isActive => isActive ? 'navbar-link' : 'inactive navbar-link'}>노트</NavLink>
                </li>
            </ul>
        );
    }
}

export default NavBar;
