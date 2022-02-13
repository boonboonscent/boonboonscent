import '../../styles/Weather.css';
import {PureComponent} from "react";
import axios from "axios";

class Weather extends PureComponent {
    weather = {'맑음':'sun', '흐림': 'cloud', '비': 'rain', '눈': 'snow'};

    state = {
        date: null,
        weather: null,
        temperature: null,
        loading: true
    }

    // 날씨 정보 받아와 state 설정
    getWeather = async (today) => {
        axios.get('/weather')
            .then((response) => {
                console.log(response.data);
                if(response.data.success === true) {
                    const data = response.data.data;

                    this.setState({
                        loading: false,
                        date: today,
                        weather: `./icons/${this.weather[data.weather]}-grey.svg`,
                        temperature: data.temperature
                    });
                } else {
                    this.setState({
                        loading: true,
                        date: today,
                        weather: null,
                        temperature: null
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    componentDidMount() {
        // 오늘 날짜 MM/DD
        var today = new Date();
        today = `${today.getMonth() + 1}/${today.getDate()}`;
        this.getWeather(today);
    }

    render() {
        return (
            <div className='container'>
                {this.state.loading ?
                    <div className='text'>로딩 중..</div>
                    :
                    <>
                        <div className='item'>
                            <img src='./icons/calendar.svg' height={19} alt='calendar'/>
                            <div className='text'>{this.state.date}</div>
                        </div>
                        <div className='item'>
                            <img src='./icons/location.svg' height={38} alt='location'/>
                            <div className='text'>서울</div>
                        </div>
                        <div className='item'>
                            <img src={this.state.weather} height={19} alt='weather'/>
                            <div className='text'>{this.state.temperature} &deg;C</div>
                        </div>
                    </>
                }

            </div>
        );
    }
}
export default Weather;
