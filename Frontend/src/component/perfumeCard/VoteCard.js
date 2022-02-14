import '../../styles/VoteCard.css'
import {PureComponent} from "react";

class VoteCard extends PureComponent {
    state = {
        product: this.props.perfume.product,
        house: this.props.perfume.house,
        imageName: `./images/perfumes/${this.props.perfume.imageName}`
    };

    render() {
        console.log(this.state);
        return (
            <div className='vote-card-container'>
                <img src={this.state.imageName} alt='perfume' width={80} height={64}/>
                <div className='vote-card-right'>
                    <div className='vote-card-product'>{this.state.product}</div>
                    <div className='vote-card-house'>{this.state.house}</div>
                    <div>투표 현황</div>
                </div>
            </div>
        )
    }
}

export default VoteCard;
