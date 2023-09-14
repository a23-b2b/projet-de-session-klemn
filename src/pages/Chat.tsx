import React, {useState, useEffect} from 'react';
import {db} from '../firebase'
import { doc, getDoc, setDoc } from "firebase/firestore"; 


function Chat() {
    const [messageData, setMessageData] = useState({});

    useEffect(() => {
        const collectionName = 'messages';
    
        const documentId = 'uARocPk3a3SABat89yYv';
    
        const messageDocRef = doc(db, collectionName, documentId);
    
        async function fetchMessageData() {
          try {
            const docSnapshot = await getDoc(messageDocRef);
            if (docSnapshot.exists()) {
              setMessageData(docSnapshot.data());
              console.log(docSnapshot.data())
            } else {
              console.log('Document does not exist');
            }
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        }
    
        //fetchMessageData();
      }, []);

    return (
        <div>
            
            <div>
                <form className="new-message-form">
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
