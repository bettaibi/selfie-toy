import { useEffect, useState, useRef } from 'react';
import defaultUser from './../../assets/default.jpg';

const RandomCover = ({ width, heigth, rotation, marginTop }) => {
    const [randomUser, setRandomUser] = useState(defaultUser);
    const pic = useRef();

    useEffect(() => {

        fetchRandomUser();

        return () => {
            setRandomUser(defaultUser);
        }
    }, []);

    const fetchRandomUser = async () => {
        try {
            const res = await fetch('https://randomuser.me/api/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            pic.current.classList.add('fadeIn');
            setRandomUser(data.results[0].picture.large);
        }
        catch (err) {
            console.error(err.message)
        }
    }


    return (
        <div className="shadow cover" style={{ width: width, height: heigth, transform: rotation, marginTop: marginTop }}>
            <img ref={pic} src={randomUser} alt="cover" />
        </div>
    )
}

export default RandomCover
