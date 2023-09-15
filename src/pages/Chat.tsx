import React, { useState, useEffect } from 'react';
import { db, messaging } from '../firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";



function Chat() {
  const [messages, setMessages] = useState<any>(null);

  const collectionName = 'messages';

  const documentId = 'yRzBBO1xnRv37OR66buL';




  async function getdata() {
    const docRef = doc(db, "conversation", documentId);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data())
    setMessages(docSnap.data())
    //console.log(messages)
  }

  useEffect(() => {
    getdata();
  })

  // const [messageData, setMessageData] = useState({});

  // useEffect(() => {
  //   const collectionName = 'messages';

  //   const documentId = 'uARocPk3a3SABat89yYv';

  //   const messageDocRef = doc(db, collectionName, documentId);

  //   async function fetchMessageData() {
  //     try {
  //       const docSnapshot = await getDoc(messageDocRef);
  //       if (docSnapshot.exists()) {
  //         setMessageData(docSnapshot.data());
  //         console.log(docSnapshot.data())
  //       } else {
  //         console.log('Document does not exist');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching document:', error);
  //     }
  //   }

  //   //fetchMessageData();
  // }, []);

  return (
    <div>

      <div>
        <form className="new-message-form">
          {messages?.nom}
          <br />
          <input
            className="new-message-input"
            placeholder="Votre message..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
