import '../../styles/Vote.css'
import {useState, useEffect} from "react";
import VoteCard from "../perfumeCard/VoteCard";
import axios from "axios";
import VoteModal from "./VoteModal";

function Vote(props) {
    const [votedPerfume, setVotedPerfume] = useState(null);
    const [voted, setVoted] = useState(null);
    const [todayPerfumes, setTodayPerfumes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getTodayPerfumes();
        checkVote();
    }, []);

    //  오늘의 향수 가져오기
    const getTodayPerfumes = () => {
        axios.get('/api/weather/perfumes')
            .then(response => {
                setTodayPerfumes(response.data.perfumeList);
            }).catch(err => {
                console.log(err);
        })
    }

    // 회원 투표 여부 확인
    const checkVote = () => {
        axios.get('/api/vote')
            .then(response => {
                if(response.data.success) {
                    setVoted(response.data.voted);
                    setVotedPerfume(response.data.perfume);
                } else {
                    setVoted(false);
                }
            }).catch(err => {
                console.log(err);
                setVoted(false);
        })
    }

    // 라디오 버튼 선택 이벤트 핸들러
    const onChangeInput = (e) => {
        setVotedPerfume(e.target.value);
    }


    // 투표 버튼 클릭 이벤트 핸들러 -> 모달창 띄워줌
    const onClickVoteButton = () => {
        setIsOpen(true);
    }

    // 모달창 - 취소 버튼
    const onClickCancel = () => {
        setIsOpen(false);
    }

    // 모달창 - 확인 버튼
    const onClickAccept = () => {
        setIsOpen(false);
        votePerfume();
    }

    // 투표 API 호출
    // voted 상태 update
    const votePerfume = () => {
        axios.post('/api/vote', {
            perfume_id: votedPerfume,
            weather: props.weather,
            temperature: props.temperature,
            date: props.date
        }).then(response => {
            if(response.data.success) {
                setVoted(true);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='vote-container'>
            <VoteModal isOpen={isOpen} onClickCancel={onClickCancel} onClickAccept={onClickAccept} />
            <div className='vote-item-container'>
                {
                    todayPerfumes.map(perfume =>
                        <div key={perfume.id} className='vote-item'>
                            {voted !== null && <VoteCard perfume={perfume} voted={voted}/>}
                            <input
                                id={perfume.id}
                                value={perfume.id}
                                name="perfume"
                                type="radio"
                                checked={votedPerfume === perfume.id}
                                defaultChecked={false}
                                onChange={voted ? null : onChangeInput}
                            />
                            <label htmlFor={perfume.id}>
                                <img
                                    width={48} height={48}
                                    src={votedPerfume === perfume.id ?
                                        './icons/selected.svg' : './icons/unSelected.svg'}/>
                            </label>

                        </div>
                    )
                }
            </div>

            <div className={voted ? 'vote-button-inactive' : 'vote-button-active'}
                 onClick={voted ? null : onClickVoteButton}>
                향수 투표하기
            </div>
        </div>
    )

}

export default Vote;
