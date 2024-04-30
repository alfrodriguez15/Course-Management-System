import React, { useState, useEffect } from 'react';
import "./Chatbot.css"
import Navbar from '../../components/Navbar';
import Sidebar from './components/Sidebar';

// function formatText(text) {
//     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
//     text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
//     text = text.replace(/\#\#(.*?)/g, '<h2>$1</h2>');
//     return text
// }

function ChatBot () {
    const [showSidebar, setShowSidebar] = useState(false);
    const [prompt, setPrompt] = useState('');
    // const [chatbotReply, setChatbotReply] = useState('')
    const [messages, setMessages] = useState([])
    const [pressable, setPressable] = useState(true)
    useEffect(() => {
        let enterButton = document.getElementsByClassName("chat-enter")
        let input = document.getElementsByClassName("chat-input")
        if (pressable)
        {
            //change placeholder to original
            //make it available tgo press
            input[0].setAttribute("placeholder", "Write your prompt here")
            enterButton[0].disabled = false;
        }
        else {
            input[0].setAttribute("placeholder", "Waiting on a response")
            enterButton[0].disabled = true;
        }
    }, pressable)
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
      };
    const sendMessage = (event) => {
        event.preventDefault()
        setPressable(false)
        //have a function to check button status
        //here it should make it not pressable and change the placeholder to "Waiting on a response" or something like that
        let updatedMessages = [...messages]
        updatedMessages.push({ id: updatedMessages.length + 1, text: prompt, type: 'User' })
        setMessages(updatedMessages);
        fetch('http://localhost:5000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: prompt }),
        })
        .then(response => response.text())
        .then(data => {
        //   setChatbotReply(data.response);
            setMessages(messages.concat({ id: messages.length, text: data, type: 'Chatbot' }));
            setPressable(true)
        });
        setPrompt('')
        // updatedMessages = [...messages];
        // updatedMessages.push({ id: updatedMessages.length + 1, text: updatedMessages.length, type: 'Chatbot' })
        // setMessages(updatedMessages);
        setPressable(true)
    };
    return (
        <div className="body">
            <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
            <div className="message-area">
                {messages.map((message) => (
                        <div key={message.id} className={`${message.type}-box`}>
                            <div className="sender-type">
                                {message.type}
                            </div>
                            <div className={`${message.type}-message`}>
                                {message.text}
                            </div>
                            
                        </div>
                ))}
            </div>
            <form className="input-area" onSubmit={sendMessage} >
                <input className="chat-input" type="text" placeholder="Write your prompt here" value ={prompt}
                onChange={(e) => 
                    setPrompt(e.target.value) /*change state of button here as well?*/
                    }/>
                <button className="chat-enter" >Enter</button>
            </form>
            
        </div>
    );
}
export default ChatBot;