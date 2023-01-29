import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Povar(props) {
  const navigate = useNavigate()
  const {povar, isPovar} = props

  useEffect(()=>{
    if(!povar){
      navigate('/login')
    }
  })
  return (
    <div>
      povar page
    </div>
  );
}

export default Povar;