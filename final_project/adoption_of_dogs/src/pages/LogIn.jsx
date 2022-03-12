import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userConnection } from '../redux/userConncection';


function validateForm(){
  var email = document.getElementById('email_input');
  // console.log(email);
  console.log('laksjdlkajsdlkjasdlkjaslkdjasldkj');
}

const LogIn = (props) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = (data) => {
    dispatch(userConnection({ email: data.email, password: data.password }));
    setIsEmpty(true);
  };
  useEffect(() => {
    if (user.status === 'noUsers' && isEmpty) {
      setIsEmpty(false);
      alert('check your details!');
    }
    if (user.status === 'success') {
      console.log('________________');
      localStorage.setItem('User', JSON.stringify(user.obj));
      setIsSuccess(true);
    }
  }, [user.status]);

  useEffect(() => {
    if (
      localStorage.getItem('User')
        ? localStorage.getItem('User').length > 50
        : false && isSuccess
    ) {
      window.location.pathname = '/AdoptionDogs';
      window.localStorage.url = window.location.pathname;
      setIsSuccess(false);
    }
  }, [isSuccess]);
  return (
    <React.Fragment>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder={'Email'}
            {...register('email', { required: 'email is required!' })}
            type="email"
          ></input>
          <input placeholder='Password'
            {...register('password', { required: 'password is required!' })}
            type="password"
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    </React.Fragment>
  );
};
export default LogIn;
