import {useEffect,useState} from "react";
import axios from "axios";
import {Component} from "react";
import BasicCard from "../perfumeCard/BasicCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"



const Note = (props) => {
    const [loading, setLoading] = useState(true);
    const [perfume,setPerfume] = useState([]);
    useEffect(() => { getPerfumes();
    }, []);
    
    const settings = 
    {
         dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1

    };

    const getPerfumes = ()=>{
        axios.get(`/api/perfume?group=${props.noteInfo.group}&limit=5`)
            .then (response=>{
                if(response.data.success){
                    setLoading(false);
                    setPerfume(response.data.data);
                   
                }else{
                    setLoading(true);
                    setPerfume([]);
              
                }
            }).catch(err=>{
                setLoading(true);
                setPerfume([]);
            })
    }


    return(
        <>
                <div>{props.noteInfo.note}</div>
                <div>{props.noteInfo.explain}</div>
    
                <div>
                    <Slider{...settings}>{perfume.map(item => <BasicCard perfume ={item}/> )}</Slider>
                </div>

            </>
    )
}

export default Note;
