import {Component} from "react";
import Header from "../component/common/Header";
import NavBar from "../component/common/NavBar";

class Archive extends Component {
    render() {
        return (
            <>
                <Header />
                <NavBar/>
                <div className='body'>
                    아카이브
                </div>
            </>
        )
    }
}

export default Archive;
