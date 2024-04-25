import React from 'react';
import './Chatbot.css'; // Import your CSS file for styling

const Chatbot = () => {
  return (
    
    <div className="wrapper">
      <div className="title">Course Chatbot</div>
      <div className="box">
        <div className="item">
          <div className="icon">
            <i className="fa fa-user"></i>
          </div>
          <div className="msg">
            <p>What courses can we help you find today?</p>
          </div>
        </div>
        <br clear="both" />
        <div className="item right">
          <div className="msg">
            <p>Find me Pathway 2 courses</p>
          </div>
        </div>
      </div>

      <div className="typing-area">
        <div className="input-field">
          <input type="text" placeholder="Type your request" required />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;