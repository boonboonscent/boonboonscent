import {Component} from "react";
import Header from "../component/common/Header";
import NavBar from "../component/common/NavBar";

class Notes extends Component {
    render() {
        return (
            <>
                <Header />
                <NavBar/>
                <div className='body'>
                    노트
                </div>
            </>
        )
    }
}

export default Notes;
