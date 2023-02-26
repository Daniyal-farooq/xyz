import React from 'react'
import styles from '../styles/home.module.css'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { async } from '@firebase/util';
import { doc, addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import { ChangeEvent } from "react"
import { ref } from "firebase/storage";
import { uploadBytes } from 'firebase/storage';
import { storage, db } from '../database'
import { getDownloadURL } from 'firebase/storage';
import { auth, createUserWithEmailAndPassword } from "../database"
import { useEffect } from 'react'
import Card from 'react-bootstrap/Card';

type typeofevent = {
    title: string,
    date: string,
    time: string,
    location: string,
    description: string,
    id: string,
  }


const home = () => {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
    const[events,setEvents] = useState<typeofevent[]>([])


    useEffect(() => {
        
        getter()

    }, [])

  const eventsubmithandler=async()=>{
    if (!title || !date || !time || !location || !description) {
        alert("Enter all details")
      }
      try {
        const newdoc = {
          title: title,
          date: date,
          time: time,
          location: location,
          description: description
        }
        const docRef = await addDoc(collection(db, "events."), newdoc);
  
        setEvents([...events, { ...newdoc, id: docRef.id }])
      } catch (error) {
        console.log("ERROR");
  
      }
   }
   const getter = async()=>{
    const querySnapshot = await getDocs(collection(db, "events."));
    let eventlist: typeofevent[] = []
    querySnapshot.forEach((doc) => {
        eventlist.push({
            title: doc.data().title,
            date: doc.data().time,
            time: doc.data().time,
            location: doc.data().location,
            description: doc.data().description,
            id: doc.id,
        });
        setEvents(eventlist)
        
    });
    const updatehanlder = (event:typeofevent)=>{
        console.log("g");
        
    }
   }
  return (
    <>
         <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 text-center">
              <div className={styles.loader}>
                <span>L</span>
                <span>E</span>
                <span>T's</span>
                <span></span>
                <span></span>
                <span>C</span>
                <span>R</span>
                <span>E</span>
                <span>A</span>
                <span>T</span>
                <span>E</span>
                <span>!</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`container-fluid ${styles.uploadcard}`}>
        
        <div className={styles.card}>
          <input type="text" onChange={(e) => { setTitle(e.target.value) }} placeholder="Title" name="text" className="input"></input><br />
          <input type="date" onChange={(e) => { setDate(e.target.value) }} name="date" className="input"></input><br />
          <input type="time" onChange={(e) => { setTime(e.target.value) }} name="time" className="input"></input><br />
          <input type="text" onChange={(e) => { setLocation(e.target.value) }} placeholder="location" name="location" className="input"></input><br />
          <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="description" name="descriprtion" className="input"></input><br />
          <Button onClick={eventsubmithandler} variant="info">SubmitEvent</Button>{' '}
        </div></div>
        {/* MAPPING */}
        {events.map((event:typeofevent)=>{
            return(
                <>
                <hr/>
                <h3 className={styles.eventtitle}>{event.title}</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div><div className="col-2">Date</div><div className="col-2"></div><div className="col-4">{event.date}</div><div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-3"></div><div className="col-2">Time</div><div className="col-2"></div><div className="col-4">{event.time}</div><div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-3"></div><div className="col-2">Description</div><div className="col-2"></div><div className="col-4">{event.description}</div><div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-3"></div><div className="col-2">Location</div><div className="col-2"></div><div className="col-4">{event.location}</div><div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4"><Button  variant="danger">Update</Button>{' '}
                        <Button variant="info">Join</Button>{' '}</div>
                        <div className="col-4"></div>
                    </div>
                </div>
                <hr/>
                </>
            )
        })}
    </>
  )
}

export default home