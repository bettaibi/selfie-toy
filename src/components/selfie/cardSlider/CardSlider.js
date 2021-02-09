import {useRef, useEffect, useState} from 'react'
import chevronLeft from '../../../assets/icons/chevron_left.svg';
import chevronRight from '../../../assets/icons/chevron_right.svg';

let filters =  [
    {title: 'normal', value: 'none', active: true},
    {title: 'grayscale', value: 'grayscale(100%)', active: false},
    {title: 'sepia', value: 'sepia(100%)', active: false},
    {title: 'blur', value: 'blur(4px)', active: false},
    {title: 'saturate', value: 'saturate(2)', active: false},
    {title: 'hue', value: 'hue-rotate(140deg)', active: false},
    {title: 'brightness', value: 'brightness(.5)', active: false},
    {title: 'invert', value: 'invert(0.8)', active: false},
    {title: 'contrast', value: 'contrast(2)', active: false},
    {title: 'hautContrast', value: 'contrast(200%)', active: false},
    {title: 'combination', value: 'grayscale(0.5) blur(10px)', active: false},
    {title: 'mix', value: 'contrast(1.4) saturate(1.8) sepia(.6)', active: false},
    {title: 'opacity', value: 'opacity(.7)', active: false},
    {title: 'mdc', value: 'contrast(25%)', active: false}
];
let animationClass = '';

const CardSlider = ({stream, onFilterChanged}) => {
    let [effects, setEffects] = useState([]);
    let [currentIndex, setCurrentIndex] = useState(3);

    useEffect(()=>{
        setEffects(filters.slice(currentIndex - 3, currentIndex));

        return () =>{

        }
    }, [currentIndex]);


    const next = (e) =>{
        e.stopPropagation();
        if((currentIndex + 3) > filters.length) return;
        else {animationClass = 'slideRight'; setCurrentIndex(prev => prev + 3)};
    }

    const previous = (e) =>{
        e.stopPropagation()
        if((currentIndex - 3) <= 0) setCurrentIndex(3);
        else {animationClass = 'slideLeft'; setCurrentIndex(prev => prev - 3);};
    }

    const onActiveChanged = (item) =>{
        filters = [...filters.map(effet => item.title === effet.title ? {...effet, active: true} : {...effet, active: false})];
        setEffects(filters.slice(currentIndex - 3, currentIndex));
        onFilterChanged(item.value);
    }

    return (
        <>
            <button className="btn btn-accent rounded-icon shadow-sm" style={{marginRight: '0.6rem'}}
            onClick={previous}>
                <img src={chevronLeft} alt="previous"/>
            </button>
            {
                effects.map(item =>{
                    let active = item.active ? 'active' : '';

                    return (
                     <Card  onActiveChanged = {(e)=>{e.stopPropagation(); onActiveChanged(item)}}  active={active} key={item.title}  stream={stream} title={item.title} value={item.value} animation= {animationClass}/>
                    )
                })
            }
            <button className="btn btn-accent rounded-icon shadow-sm" style={{marginLeft: '0.6rem'}}
            onClick={next}>
                <img src={chevronRight} alt="next"/>
            </button>
        </>
    )
}

const Card = ({stream, title, value, active, onActiveChanged, animation}) =>{
    let videoCardRef = useRef();

    useEffect(()=>{
        videoCardRef.current.srcObject = stream;
        videoCardRef.current.play();
    }, []);

    return(
        <div className={animation+' options '+ active} onClick={(e)=>{onActiveChanged(e)}}>
            <video className="preview" ref={videoCardRef} style={{filter: value}}></video>
            <div className="desc">{title}</div>
        </div>
    )
}

export default CardSlider
