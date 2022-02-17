import {Component} from "react";

class VoteCard extends Component {
    state = {
        product: this.props.perfume.product,
        house: this.props.perfume.house,
        imageName: `./images/perfumes/${this.props.perfume.imageName}`,
        turnout: this.props.perfume.turnout,
        voted: this.props.voted
    };

    render() {
        // console.log(this.state);
        return (
            <div className='vote-card-container'>
                <img src={this.state.imageName} alt='perfume' width={80} height={64}/>
                <div className='vote-card-right'>
                    <div className='vote-card-product'>{this.state.product}</div>
                    <div className='vote-card-house'>{this.state.house}</div>
                    <div className={
                        this.state.voted ? 'vote-card-turnout voted' : 'vote-card-turnout'
                    }>
                        <div className='bar-chart'>
                            <div className='bar-chart-value'
                                 style={{width: this.state.turnout/100*113}}
                            ></div>
                        </div>
                        <div className='vote-card-turnout-text'>
                            {this.state.turnout}%
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VoteCard;
