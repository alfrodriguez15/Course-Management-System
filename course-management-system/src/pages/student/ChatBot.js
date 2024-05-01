import React, { useState, useEffect } from 'react';
import "./Chatbot.css"
import Navbar from '../../components/Navbar';
import Sidebar from './components/Sidebar';

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
        let newUserMessage = { id: updatedMessages.length + 1, text: prompt, type: 'User' }
        updatedMessages.push(newUserMessage)
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
            // let botResponse = data.substring(1, data.length - 1)
            let chatBotResponse = { id: newUserMessage.id + 1, text: data, type: 'Chatbot' }
            setMessages([...updatedMessages, chatBotResponse]);
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
                                {/* {message.text} */}
                                <div dangerouslySetInnerHTML={{ __html: message.text}} />
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