import {PureComponent} from "react";
import {HeartFilled} from '@ant-design/icons';
import '../../styles/BasicCard.css'

class LikeButton extends PureComponent{
    state = {
        liked : false
    };

    onClick = () => {				
        this.state.liked ?		
        this.setState({
            liked: false,		
        })
        :
        this.setState({				
            liked: true,		
        });
    }
    render(){
        return(
            <>
                <div>
                    {this.state.liked ? 															 
                    <HeartFilled className="like_btn liked" onClick={this.onClick}/> :
                    <HeartFilled className="like_btn unliked" onClick={this.onClick}/>}				
                </div>
            </> 
        )
    }
}
export default LikeButton;