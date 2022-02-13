import { PureComponent } from "react";

class Header extends PureComponent {
    render() {
        return (
            <div className='header'>
                <img src='./logo.svg' height={20}/>
            </div>
        )
    }
}

export default Header;
