import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { async } from "@firebase/util";
import { ChangeEvent} from "react"
import {  ref } from "firebase/storage";
import { uploadBytes } from 'firebase/storage';
import {storage , db} from '../database'
import { getDownloadURL } from 'firebase/storage';
import {auth , createUserWithEmailAndPassword} from "../database"
import { doc, addDoc, collection } from "firebase/firestore";
import Router from 'next/router';
import styles from '../styles/signup.module.css'
import { TypeFlags } from 'typescript';

const signup = () => {

  const [email , setemail] = useState("")
  const [name , setname] = useState("")
  const [password , setpassword] = useState("")
  const [id, setid] = useState("")
  const [error , seterror] = useState("")

  
  const onsubmithandler = async()=>{
    if ( !name || !email || !password   ){
      seterror("Please enter all the fields!")
    }
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user
      const uid = user.uid

     
      const newdoc = {
        name : name,
        email: email,
        id:uid
      }
      await addDoc(collection(db, "users"),newdoc);
      Router.push('/login')

    }catch(e){
      console.log(e);
      
    }

  };
 
    
  
  return (
    <>
    <div className={styles.spinner}></div>
    <div className={styles.main} >
      
      {/* <hr/>
      <form action="">
        Name:<input type="text" name="Name" onChange={(e)=>setname(e.target.value)}></input><br/>
        Email:<input type="email" name="Emial" onChange={(e)=>setemail(e.target.value)}></input><br/>
        Set Password<input type="password" name="Password" onChange={(e)=>setpassword(e.target.value)}></input><br/>
        <input type="file" onChange={savefile}/><br/>
        <hr/>
      </form><button onClick={onsubmithandler}>submit</button> */}
      </div>
      
      <div className={styles.card}>
       <div className="conatiner">
        <div className="row"><div className="col-1"></div><div className="col-2">Name</div><div className="col-5"><input onChange={(e)=>setname(e.target.value)} type="text" placeholder="...here" name="text" className={styles.input}></input></div></div>
        <div className="row"></div>
        <div className="row"><div className="col-1"></div><div className="col-2">Email</div><div className="col-5"><input onChange={(e)=>setemail(e.target.value)} type="email" placeholder="...here" name="text" className={styles.input}></input></div></div>
        <div className="row"></div>
        
        <div className="row"><div className="col-1"></div><div className="col-2">Password</div><div className="col-5"><input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="...here" name="text" className={styles.input}></input></div></div>
       </div>
       

      
<div className="row"><div className={`${styles.btn} col-md-3 offset-md-3`}> <button className={styles.button} onClick={onsubmithandler}>
    <span className={styles.button_lg}>
        <span className={styles.button_sl}></span>
        <span className={`${styles.button_text}`}>Submit</span>
    </span>
</button></div></div>

      </div>
    </>
  )
}

export default signup