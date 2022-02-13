import {Component} from "react";
import VoteCard from "../perfumeCard/VoteCard";
class Vote extends Component {
    // 임시 향수 후보들..
    perfumeList = [
        {product: 'Blackberry & Bay Cologne', house: 'Jo Malone', imageName: 'Blackberry_&_Bay_(Cologne)_Jo_Malone.jpg'},
        {product: 'DaliA More', house: 'Salvador Dali', imageName: 'DaliA_More_Salvador_Dali.png'},
        {product: 'Valentina Acqua Floreale', house: 'Valentino', imageName: 'Valentina_Acqua_Floreale_Valentino.jpg'}
    ]
    render() {
        return (
            <div className='vote-container'
                 style={{
                     display: 'grid',
                     rowGap: '16px'
                 }}
            >
                {
                    this.perfumeList.map(perfume =>
                        <VoteCard perfume={perfume} />
                    )
                }
            </div>
        )
    }
}

export default Vote;
