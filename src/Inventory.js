/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect,useState} from 'react';
import { db } from './firebase';
import './Home.css'
import Firestoreproduct from './Firestoreproduct';
import laptopStand from './laptopstand.png'
import mattress from './mattress.jpg'
import recliner from './recliner.jpg'
import mandala from './mandala.jpg'
import monitor from './monitor.jpg'

function Inventory() {
    const [inventory,setInventory]  = useState([])

    useEffect(() => {
             db
             .collection('inventory')
             .onSnapshot(snapshot =>(
                setInventory(snapshot.docs.map(doc => ({
                     id: doc.id,
                     data : doc.data()
                 })))
             ))
    },[])
    console.log("inventory:",inventory)
    return (
        <div class='home'>
            <div className='home_container'>
                <img className='home_image'
                src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'></img>
            </div>

        
            <div className='home_row'>
                {inventory.slice(0, 2)?.map(inventory =>(
                    <Firestoreproduct inventory ={inventory}/>
                ))}  
            </div> 

            <div className='home_row'>
                {inventory.slice(2, 5)?.map(inventory =>(
                    <Firestoreproduct inventory ={inventory}/>
                ))}  
            </div> 

            <div className='home_row'>
                {inventory.slice(5)?.map(inventory =>(
                    <Firestoreproduct inventory ={inventory}/>
                ))}  
            </div> 

        </div>
    )
}

export default Inventory
