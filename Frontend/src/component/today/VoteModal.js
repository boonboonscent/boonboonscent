import {Component} from "react";
import Modal from "react-modal";

class VoteModal extends Component {

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                   style={{
                       content: {
                           position: 'absolute',
                           width: 343,
                           height: 218,
                           left: 16,
                           top: 309,
                           padding: 0,
                           borderRadius: 8
                   }
                   }}
            >
                <div>
                    <div className='vote-modal-text'>
                        <div>
                            한번 선택한 투표는 바꾸지 못해요.<br/>
                            이 향수로 투표할까요?
                        </div>
                    </div>
                    <div className='vote-modal-button'>
                        <div className='vote-modal-cancel-button' onClick={this.props.onClickCancel}>
                            <div>다른 향수로 바꿀래요</div>
                        </div>
                        <div className='vote-modal-accept-button' onClick={this.props.onClickAccept}>
                            <div>좋아요!</div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default VoteModal;
