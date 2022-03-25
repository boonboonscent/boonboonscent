import {Component} from "react";
import Header from "../component/common/Header";
import NavBar from "../component/common/NavBar";
import Note from "../component/note/Note";
import {group} from "../component/note/data/Note";

class Notes extends Component {
    render() {
        
        return(
            <>
                <Header />
                <NavBar/>
                <div className='body'>
                    {
                        group.map(noteInfo =>
                            <Note noteInfo={noteInfo} />
                        )
                    }
                </div>
            </>
        )
    }
}

export default Notes;
