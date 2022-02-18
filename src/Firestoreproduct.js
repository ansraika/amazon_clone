import React from 'react'
import './Product.css'
import Product from './Product'


function Firestoreproduct({inventory}) {
   
    console.log("FirestoreProduct0:",JSON.stringify(inventory.data.title))
    console.log("FirestoreProduct1:",[inventory.data.title])
    return (
        <div className='product'>
            {/* {[inventory.data]?.map(item =>( 
                <Product
                    id = {item.data.id}
                    title={item.data.title}
                    price={item.data.price}
                    image = {item.data.image}
                    rating={item.data.rating}
                />
            ))}  */}

            {[inventory.data]?.map(item =>( 
                <Product
                    id = {[inventory.data.id]}
                    title={[inventory.data.title]}
                    price={[inventory.data.price]}
                    image = {[inventory.data.image]}
                    rating={[inventory.data.rating]}
                />
            ))}     

        </div>
    )
}

export default Firestoreproduct
