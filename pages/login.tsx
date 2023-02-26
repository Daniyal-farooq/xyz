import React from 'react'
import { useState, } from 'react'
import { auth, signInWithEmailAndPassword } from "database";
import Router, { useRouter } from "next/router";
import { async } from '@firebase/util';
import styles from '../styles/login.module.css'

const   Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onsubmithandler = async () => {
      try {
          await signInWithEmailAndPassword(auth, email, password)
          Router.push('/home')
      } catch (error) {
          alert("Wrong credentials")
      }
  }
  return (
    <>
    <div className={styles.spinner}></div>
    <div className={styles.main} >
      
      
      </div>
      
      <div className={styles.card}>
       <div className="conatiner">
        <div className="row"></div>
        <div className="row"><div className="col-1"></div><div className="col-2"></div><div className="col-5"><input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" name="text" className={styles.input}></input></div></div>
        
        <div className="row"><div className="col-1"></div><div className="col-2"></div><div className="col-5"><input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password" name="text" className={styles.input}></input></div></div>
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

export default Login