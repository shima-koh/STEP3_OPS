"use client"
import React, { useState, useRef, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import  LHeader  from '@/components/containers/local_header';

import Link from 'next/link';

const ChatGPT = () => {

  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const chatHistoryRef = useRef(null);


  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 会話履歴全体を送信
      body: JSON.stringify({ conversation: [...conversation, { role: "user", content: userInput }] }),
    });

    const data = await res.json();
    console.log(conversation);

    setConversation([
      ...conversation,
      { role: 'user', content: userInput },
      { role: "assistant", content: data.response }
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

      <LHeader />
      <h1 className="text-3xl mb-4">Chat with GPT</h1>

      {/* チャット表示エリア */}
      <PerfectScrollbar
        containerRef={(ref) => {
          chatHistoryRef.current = ref;
        }}
        className="flex-grow overflow-y-auto max-h-[80vh] mb-2 p-4 w-[60vw] break-words"
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
              <p className="bg-base-400 inline-block p-4 rounded-tl-full rounded-br-full rounded-bl-full">
                {entry.content}
              </p>
            </div>
          </div>
        ))}

      </PerfectScrollbar>

      {/* 下部固定入力欄 */}
      <form onSubmit={handleSubmit} className="fixed bottom-0 p-4 w-[50vw]">
        
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
