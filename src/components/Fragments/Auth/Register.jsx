/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useFormik } from 'formik';

import useRegister from '../../../hooks/users/useRegister';
import authRegister from '../../../schema/auth/register';
import Button from '../../Elements/Button/Button';
import Fields from '../../Elements/Fields';
import SelectOpt from '../../Elements/Option/Option';

function FormRegister() {
  const [loading, setLoading] = useState(false);

  const { register, isLoading, isError } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      role: '',
    },
    validationSchema: authRegister,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
        role: values.role === 'admin' ? 'Admin' : 'User', // admin dulu khususnya
      };

      setLoading(true);
      register(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">
      <div>
        <Fields
          htmlFor="name"
          label="Name"
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your name"
          className={`mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm ${formik.errors.name && formik.touched.name ? 'ring-2 ring-red-500' : ''}`}
          autoComplete="off"
        />
        {formik.errors.name && formik.touched.name && (
          <small className="text-red-500 text-xs">{formik.errors.name}</small>
        )}
      </div>

      <div>
        <Fields
          htmlFor="email"
          label="Email"
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your email"
          className={`block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm ${formik.errors.email && formik.touched.email ? 'ring-2 ring-red-500' : ''}`}
          autoComplete="off"
        />
        {formik.errors.email && formik.touched.email && (
          <small className="text-red-500 text-xs">{formik.errors.email}</small>
        )}
      </div>

      <div>
        <Fields
          htmlFor="password"
          label="Password"
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your password"
          className={`mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm ${formik.errors.password && formik.touched.password ? 'ring-2 ring-red-500' : ''}`}
          autoComplete="off"
        />
        {formik.errors.password && formik.touched.password && (
          <small className="text-red-500 text-xs">
            {formik.errors.password}
          </small>
        )}
      </div>

      <div>
        <Fields
          htmlFor="phone_number"
          label="Phone Number"
          type="text"
          name="phone_number"
          id="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm your password"
          className={`mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm ${formik.errors.phone_number && formik.touched.phone_number ? 'ring-2 ring-red-500' : ''}`}
          autoComplete="off"
        />
        {formik.errors.phone_number && formik.touched.phone_number && (
          <small className="text-red-500 text-xs">
            {formik.errors.phone_number}
          </small>
        )}
      </div>

      <div>
        <SelectOpt
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer text-gray-500"
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'users', label: 'Users' },
          ]}
        />
        {formik.errors.role && formik.touched.role && (
          <small className="text-red-500 text-xs">{formik.errors.role}</small>
        )}
      </div>

      <Button
        type="submit"
        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-all duration-200 text-lg font-semibold"
      >
        {loading ? 'Loading...' : 'Register'}
      </Button>
    </form>
  );
}

export default FormRegister;