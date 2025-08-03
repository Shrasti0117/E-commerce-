import React, { useContext } from 'react'
import { Context } from '../context/Contextprovider';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import Populardisplay from '../components/popularDisplay/Populardisplay';
import Descriptionbox from '../components/description box/Descriptionbox';
import Relativeproduct from '../components/RelativeProduct/Relativeproduct';

const Product = () => {
  const {all_product} = useContext(Context);
  const {productID} = useParams();
  const product = all_product.find((e)=> e.id === Number(productID));
  return (
    <div>
      <Breadcrum product={product} />
      <Populardisplay product={product} />
      <Descriptionbox />
      <Relativeproduct/>
    </div>
  )
}

export default Product
