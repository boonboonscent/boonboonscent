import { Component } from "react";
import NavBar from "../component/common/NavBar";
import Header from "../component/common/Header";
import Weather from "../component/today/Weather";
import Vote from "../component/today/Vote";

class TodayPerfume extends Component {
    render() {
        return (
            <>
                <Header />
                <NavBar/>
                <div className='body'>
                    <div className="today-perfume-text">
                        {/* 예시 문구 - 추후 수정 */}
                        부슬부슬 가을비 내리는 날 <br/>
                        분분님의 향수를 투표해주세요.
                    </div>
                    <Weather />
                    <Vote />
                </div>
            </>
        );
    }
}

export default TodayPerfume;
