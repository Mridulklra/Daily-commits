import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [typedText,settypedText]=useState('');
    const [hoverLogo,sethoverLogo]=useState(false);
   const fullText :string="Never Lose an Idea Again !";
   useEffect(()=>{
   setTimeout(()=>{
    setLoading(true);
   },100);
   },[navigate]);
  return (
    <div>
    
    </div>
  )
}

export default HomePage
