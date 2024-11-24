/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import Notiflix from 'notiflix';

import { productService } from '../../service/product/product';

export function useCreateProduct() {
  const { createProduct } = productService();
  const { mutate: createProd } = useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
    }) =>
      await createProduct({
        name,
        description,
        price,
        stock,
        category_id,
        image_url,
      }),

    onSuccess: (data) => {
      Notiflix.Notify.success('Produk berhasil dibuat!');
      console.log('Create product success:', data);
    },

    onError: (error) => {
      Notiflix.Notify.failure(
        error.message || 'Gagal membuat produk. Periksa kembali data Anda!',
      );
      // console.error('Error creating product:', error);
      console.log('Error creating product', error.message);
    },
  });

  return { createProd };
}