"use client";
import React, { useEffect, useRef, useState } from "react";

const Images = () => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [img , setImg ] = useState('');
  const handleChange = (e) => {
    setFileName(e.target.files[0]);
  };

  useEffect(()=>{
    if(fileName){
        setImg(URL.createObjectURL(fileName))
    }
  } , [fileName]);
  console.log(fileName);
  
  return (
    <div>
        <button onClick={()=>{inputRef.current?.click()}}>
            image open
        </button>
      <input type="file" ref={inputRef} accept="image/*" onChange={handleChange} className="mx-10"/>
      {img && 
        <div>
            <img src={img}/>
            lllllllllllllllllllllllllllllllllllll
        </div>
      }
    </div>
  );
};

export default Images;
