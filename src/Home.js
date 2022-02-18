/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Home.css'
import Product from './Product'
import laptopStand from './laptopstand.png'
import mattress from './mattress.jpg'
import recliner from './recliner.jpg'
import mandala from './mandala.jpg'
import monitor from './monitor.jpg'

function Home() {
    return (
        <div class='home'>
            <div className='home_container'>
                <img className='home_image'
                src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'></img>
            </div>
            <div className='home_row'>
                <Product
                    id = '1'
                    title = 'The Lean Startup'
                    price = {300}
                    image= "https://images-eu.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
                    rating= {4}
                />
                <Product
                    id = '2'
                    title = 'Laptop Stand Patented Riser Ventilated Portable Foldable Compatible with MacBook Notebook Tablet Tray Desk Table Book with Free Phone Stand'
                    price = {200}
                    image= {laptopStand}
                    rating= {5}
                />
            </div>
            <div className='home_row'>
                <Product
                    id = '3'
                    title = 'Certified Natural Orthopedic Coir Mattress'
                    price = {5000}
                    image= {mattress}
                    rating= {4}                
                />
                <Product
                    id = '4'
                    title = 'Avalon Fabric Single Seater Recliner (Grey)'
                    price = {25000}
                    image= {recliner}
                    rating= {4}                
                />
                <Product
                    id = '5'
                    title = 'Fabric Mandala Abstract Wall Hanging Tapestry'
                    price = {450}
                    image= {mandala}
                    rating= {4}                
                />
            </div>
            <div className='home_row'>
            <Product
                    id = '6'
                    title = 'The Lean Startup'
                    price = {15000}
                    image= {monitor}
                    rating= {4}                
                />
            </div>
        </div>
    )
}

export default Home
