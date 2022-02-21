import '../../styles/BasicCard.css'
import {PureComponent} from "react";

class BasicCard extends PureComponent {
    state = {
        product: this.props.perfume.product,
        house: this.props.perfume.house,
        imageName: `./images/perfumes/${this.props.perfume.image_name}`
    };

    render() {
        console.log(this.state);
        return (
            <div className='basic-card-container'>
                <img src={this.state.imageName} alt='perfume' width={94} height={102}/>
                <div className='basic-card-right'>
                    <div className='basic-card-product'>{this.state.product}</div>
                    <div className='basic-card-house'>{this.state.house}</div>
                </div>
            </div>
        )
    }
}

export default BasicCard;
