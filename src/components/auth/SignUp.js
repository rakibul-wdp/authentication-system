import React, { useEffect } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../shared/Loading';

const SignUp = () => {
  const [createUserWithEmailAndPassword, createUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [sendEmailVerification, verifySending, verifyError] = useSendEmailVerification(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(googleUser || createUser);
  const navigate = useNavigate();
  let signInError;
  if (googleError || createError || updateError || verifyError) {
    signInError = (
      <p className='mb-3 text-red-500'>
        {googleError?.message || createError?.message || updateError?.message || verifyError?.message}
      </p>
    );
  }
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);
  if (googleLoading || createLoading || updating || verifySending) {
    return <Loading />;
  }
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification();
    console.log('update done', data);
  };
  return (
    <div className='flex justify-center items-center h-[60vh] my-28'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='text-center text-2xl font-bold'>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                placeholder='Your Name'
                className='input input-ghost w-full max-w-xs text-lg border-b-1 border-t-0 border-x-0 border-gray-500'
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is Required',
                  },
                })}
              />
              <label className='label'>
                {errors.name?.type === 'required' && (
                  <span className='label-text-alt text-red-500'>{errors.name.message}</span>
                )}
              </label>
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Your Email'
                className='input input-ghost w-full max-w-xs text-lg border-b-1 border-t-0 border-x-0 border-gray-500'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is Required',
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Provide a valid Email',
                  },
                })}
              />
              <label className='label'>
                {errors.email?.type === 'required' && (
                  <span className='label-text-alt text-red-500'>{errors.email.message}</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span className='label-text-alt text-red-500'>{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Password'
                className='input input-ghost w-full max-w-xs text-lg border-b-1 border-t-0 border-x-0 border-gray-500'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is Required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Must be 6 characters or longer',
                  },
                })}
              />
              <label className='label'>
                {errors.password?.type === 'required' && (
                  <span className='label-text-alt text-red-500'>{errors.password.message}</span>
                )}
                {errors.password?.type === 'minLength' && (
                  <span className='label-text-alt text-red-500'>{errors.password.message}</span>
                )}
              </label>
            </div>
            {signInError}
            <input
              className='w-full max-w-xs btn text-lg uppercase text-white font-bold bg-primary'
              type='submit'
              value='Sign Up'
            />
          </form>
          <p className='text-center'>
            <small>
              Already have an account?{' '}
              <Link className='text-primary' to='/login'>
                Please login
              </Link>
            </small>
          </p>
          <div className='divider'>OR</div>
          <button onClick={() => signInWithGoogle()} className='btn btn-outline text-lg bg-primary font-bold'>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
