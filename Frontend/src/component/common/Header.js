import { PureComponent } from "react";

class Header extends PureComponent {
    render() {
        return (
            <div className='header'>
                <img src='./logo.svg' height={20}/>
                <div>
                    <img src='./icons/search.svg' width={48} height={48}/>
                    <img src='./icons/user.svg' width={48} height={48}/>
                </div>
            </div>
        )
    }
}

export default Header;
