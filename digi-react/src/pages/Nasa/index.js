import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import style from './style.module.scss'

const NasaPage = () => {
    
    const [nasa, setNasa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchNasaData = async () => {
            const result = await Axios('https://api.nasa.gov/planetary/apod?api_key=zAt1VMRLNNKXOFHK7Sh9WFbaMfsnmP0KMA9cRENp');
            setNasa(result.data);
        }

        if(nasa) {
            setLoading(false);
        }

        const timer = setTimeout(() => {
            !nasa && fetchNasaData();
        }, 1000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [nasa]);

    console.log(nasa);

    const api_key = 'zAt1VMRLNNKXOFHK7Sh9WFbaMfsnmP0KMA9cRENp';

    return (
        <div className={style.APOD}>
            <h2>Astronomy Picture of the Day</h2>
            {loading ? <h3>Loading...</h3> : [nasa].map(nasa => (
                <p key={api_key} href={`Nasa/${nasa.api_key}`}>
                <img src={nasa.url} alt="APOD" width='400' height="auto" />
                <h3>Date: {nasa.date} </h3>
                <h3>Explanation</h3>
                <p>{nasa.explanation}</p>
                <h4>Photographer:{nasa.copyright}</h4>
                </p>
            ))}
        </div>
    );
}

export default NasaPage;