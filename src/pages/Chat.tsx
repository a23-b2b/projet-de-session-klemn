import React, { useState, useEffect } from 'react';
import { db, messaging } from '../firebase'
import { doc, getDoc, getDocs, setDoc, addDoc, collection } from "firebase/firestore";




function Chat() {
  const [messages, setMessages] = useState<any>(null);
  const [messageText, setMessageText] = useState("")

  const collectionName = 'conversation';

  const documentId = 'PkqTm4Q71Xvj5yqhweMF';
  const docRef = doc(db, collectionName, documentId);




  async function getMessage() {
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data())
    setMessages(docSnap.data())
    //console.log(messages)

  }

  function getMessages() {
    setDoc(docRef, {
      message: messageText

    });
  }
  function addData() {
    addDoc(collection(db, "messages"), {
      message: messageText
    });


  }


  useEffect(() => {
    getMessage();

  })



  return (
    <div>

      <div>
        {messages?.message}
        <br />
        <input
          className="new-message-input"
          placeholder="Votre message..."
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button className="send-button" onClick={() => addData()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
