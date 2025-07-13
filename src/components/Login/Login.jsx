import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/Image/wishlogo.png'
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const initialValues = {
    email: ""
  }

  const handleLogin = async () => {
    setIsLoading(true);


    // e.preventDefault();
    try {
      const response = await fetch('https://wishtv.onrender.com/reseller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formik.values.email,
          password,
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('authToken', data.token);
        if (data.role == 'Reseller') {
          localStorage.setItem('authorization', '7e#Q4xF@9zG3!rHgTq6vB2$Lp8eN1@wJ5kX$z9P!dT9#nC1jW4yM^fB7Q2&aC9R');
        } else if (data.role == 'subReseller') {
          localStorage.setItem('authorization', '7e#Q4xF@9zG3!rHgTq6vB2$Lp8eN1@wJ5kX$z9P!dT9#nC1jW4yM^fB7Q2&sC8aR');
        }
        console.log(data);
        toast.success(data.message, {
          theme: 'dark'
        });
        window.location.reload();
      } else {

        toast.error(data.message, {
          theme: 'dark'
        })
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };


  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin
  })

  return (
    <>
      <form className={`max-w-sm mx-auto mt-[2rem]`} onSubmit={formik.handleSubmit}>
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          <img src={logo} className='w-20 m-auto' alt="" />
        </span>
        <div className="mb-5">
          <label htmlFor="email" className={`${styles.email} flex mb-2 text-[20px] font-medium`}>Email</label>
          <input type="email"
            name='email'
            id="email"
            onChange={formik.handleChange}
            placeholder='Enter Your Email'
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

        </div>
        {formik.errors.email && formik.touched.email && (
          <span className='text-red-600'>{formik.errors.email}</span>
        )}
        <div className="mb-5">
          <label htmlFor="password" className={`${styles.password} flex mb-2 text-[20px] font-medium`}>Password</label>

          <div className={`${styles.input_password}`}>
            <input type={showPassword ? "text" : "password"}
              name='password'
              id="password"
              onChange={(e) => setPassword(e.target.value)} value={password}
              placeholder='Enter Your Password'
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <button
              type="button"
              className="absolute top-[12px] right-0 left-[299px] sm:left[290px] text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

        </div>
        <div className="flex items-start mb-5">

        </div>
        <button disabled={!(formik.isValid && formik.dirty)} type='submit'
          className={`${styles.loginBtn} btn text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center`}
        >
          {isLoading ?
            <i className='fas fa-spinner fa-spin text-2xl'></i>
            : 'Login'
          }
        </button>

        {/* <Link to={'/layout/resellerCustomer'}
          className={`${styles.loginBtn} btn text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center`}
        >Log in</Link> */}
      </form>

    </>
  )
}