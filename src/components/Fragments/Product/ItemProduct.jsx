/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable semi */
/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, ShoppingCart } from 'lucide-react';

import { useCartById } from '../../../hooks/cart/useCartById';
import { useCreateCartItem } from '../../../hooks/cartItem/useCreateCartItem';
import useAllProduct from '../../../hooks/product/useAllProduct';
import { useCreateProduct } from '../../../hooks/product/useCreateProduct';
import { addToCartItem } from '../../../redux/reducers/cartItemReducer';
import { addToCartItemStore } from '../../../redux/reducers/cartItemReducer';
import Button from '../../Elements/Button/Button';
import Card from '../Card/Card';

import FormProduct from './FormProduct';

import 'react-loading-skeleton/dist/skeleton.css';

function ItemProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, isLoading, isError, refetch } = useAllProduct();
  const dispatch = useDispatch();
  const { createProd } = useCreateProduct();
  const cart_id = useSelector((state) => state.cart.id);
  const { createCartItemMutation } = useCreateCartItem(dispatch);
  const { cartIdQuery } = useCartById();
  console.log('cartIdQuery:', cartIdQuery);

  console.log(products);

  const handleProductToCart = (product) => {
    const cartItem = {
      cart_id,
      product_id: product.id,
      quantity: 1,
      subtotal_price: product.price * 1,
    };
    createCartItemMutation(cartItem);
    console.log('isi cartItem: ', cartItem);
    dispatch(addToCartItem(product));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProduct = async (productData) => {
    await createProd(productData);
    refetch();
  };
  return (
    <section className="w-full py-16">
      <div className="w-full flex pb-3">
        <div className="flex w-1/2 justify-start items-start flex-col gap-2">
          <div className="bg-gray-200 py-2 px-3 rounded-full">
            <h4 className="text-orange-600 font-semibold">
              Checkout our Product
            </h4>
          </div>
          <h1 className="text-3xl font-semibold">Must have product</h1>
        </div>

        <div className="flex w-1/2 items-center gap-8 justify-end">
          <Link className="py-2 px-3 rounded-full border border-black">
            All Product
          </Link>

          <Link className="text-gray-500">Chair</Link>
          <Link className="text-gray-500">Table</Link>
          <Link className="text-gray-500">Bed</Link>
          <Link className="text-gray-500 underline">See All</Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        {products?.map((item) => (
          <Card className="border rounded-lg p-4">
            <Link key={item.id} to={`/product/${item.id}`}>
              <Card.Header className="mb-4">
                {isLoading ? (
                  <Skeleton height={300} width="100%" />
                ) : (
                  <img
                    src={item.image_url}
                    className="w-full h-60 object-contain rounded-lg"
                  />
                )}
              </Card.Header>
              <Card.Body className="mb-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
              </Card.Body>
            </Link>

            <Card.Footer className="flex justify-between items-center">
              <p className="font-semibold">Rp {item.price}</p>
              <ShoppingCart
                className="text-lg cursor-pointer"
                onClick={() => handleProductToCart(item)}
              />
            </Card.Footer>
          </Card>
        ))}

        {/* modal form */}
        <div
          className="border rounded-lg p-6 bg-white cursor-pointer"
          onClick={openModal}
        >
          <div className="w-full py-16 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center gap-5 hover:border-orange-600 transition-colors">
            <Plus className="text-gray-500 text-6xl" />
            <h3 className="text-sm font-base text-gray-400">Create Product</h3>
          </div>
        </div>

        {/* overlay */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 rounded-lg w-[30%] h-auto"
              onClick={(e) => e.stopPropagation()} // close overlay
            >
              <h3 className="text-2xl font-semibold mb-6">Create Product</h3>
              <FormProduct onSubmit={handleCreateProduct} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ItemProduct;
