import {Component} from "react";
import BasicCard from "../perfumeCard/BasicCard";

class Note extends Component {

    render() {
        const {noteInfo} = this.props;
        return(
            <>
                <div>{noteInfo.note}</div>
                <div>{noteInfo.explain}</div>
                <div>
                    <BasicCard perfume={{
                        product: '향수 이름',
                        house: '브랜드 이름',
                        imageName: '5th_Avenue_Nights_Elizabeth_Arden.jpeg'}} />
                </div>
            </>
        )
    }
}

export default Note;
