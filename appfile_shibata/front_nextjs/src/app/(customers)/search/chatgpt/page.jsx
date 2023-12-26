"use client"
import React, { useState, useRef, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Link from 'next/link';

const ChatGPT = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const chatHistoryRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    setConversation([
      ...conversation,
      { role: 'user', content: userInput },
    ]);

    setUserInput('');
  };

  // チャットが更新された時に最下部にスクロール
  useEffect(() => {
    // スクロールバーの位置を最下部に移動
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  }, [conversation]);

  return (
    <>
      <h1 className="text-3xl mb-4">Chat with GPT</h1>

      {/* チャット表示エリア */}
      <PerfectScrollbar
        containerRef={(ref) => {
          chatHistoryRef.current = ref;
        }}
        className="flex-grow overflow-y-auto max-h-[100vh] mb-2 p-4 w-[60vw] break-words"
        style={{
          overflowY: 'scroll',
        }}
      >

        {conversation.map((entry, index) => (
          <div key={index} className="mb-2">
            <p className={entry.role === 'user' ? 'text-right' : 'text-left'}>
              <strong>{entry.role === 'user' ? 'You' : 'GPT'}:</strong>
            </p>
            <div className={entry.role === 'user' ? 'text-right' : 'text-left'}>
              <p className="bg-primary-content inline-block p-4 rounded-tl-full rounded-br-full rounded-bl-full">
                {entry.content}
              </p>
            </div>
          </div>
        ))}

      </PerfectScrollbar>

      {/* 下部固定入力欄 */}
      <form onSubmit={handleSubmit} className="fixed bottom-0 p-4 bg-white w-[50vw]">
        
        <div className="flex items-center">

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Say something..."
            className="flex-grow p-2 border border-gray-300 rounded"
          />

          <button type="submit" className="ml-2 btn btn-outline">
            Send
          </button>

        </div>
        
      </form>

    </>
  );
};

export default ChatGPT;
