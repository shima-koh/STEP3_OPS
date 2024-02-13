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
  const handleSelect = async (text) => {
    if (!text.trim()) return;
  
    // ローカルでconversationを更新
    setConversation([
      ...conversation,
      { role: 'user', content: text },
    ]);
  
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // サーバーに会話履歴を送信
      body: JSON.stringify({ conversation: [...conversation, { role: 'user', content: text }] }),
    });
  
    const data = await res.json();
  
    // サーバーからの応答を会話履歴に追加
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: 'assistant', content: data.response },
    ]);
  
    // ユーザー入力をクリア
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
            {entry.role ==="user" &&(
              <div className='text-right'>
              <p className="bg-base-400 inline-block p-4 rounded-tl-full rounded-br-full rounded-bl-full">
                {entry.content}
              </p>
            </div>
            )}
            {entry.role !== "user" &&(
              <div className='text-left'>
              <p className="bg-base-400 inline-block p-4 rounded-tl-full rounded-br-full rounded-bl-full">
              {entry.content}<br/>
              </p>

            </div>
            )}
            
          </div>
        ))}

      </PerfectScrollbar>

      {conversation.length === 0 && (
        <div className="fixed bottom-0 p-4 w-[50vw]">

          <div className='flex flex-wrap justify-center p-4'>
            <div className="card w-96 outline outline-primary p-4 m-4 hover:bg-primary hover:opacity-90 transition duration-300" onClick={() => handleSelect("Reactを使ってできる案件を教えて")}>
              <p className="text-center">Reactを使ってできる案件を教えて</p>
            </div>
            <div className="card w-96 outline outline-primary p-4 m-4 hover:bg-primary hover:opacity-90 transition duration-300">
              <p className='text-center'>応募期限が近い案件を教えて</p>
            </div>
            <div className="card w-96 outline outline-primary p-4 m-4  hover:bg-primary hover:opacity-90 transition duration-300">
              <p className='text-center'>次どんな事勉強するといい？</p>
            </div>
            <div className="card w-96 outline outline-primary p-4 m-4  hover:bg-primary hover:opacity-90 transition duration-300">
              <p className='text-center'>新規事業に関連する案件はどれ？</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} >
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
        </div>
      )}
      {conversation.length > 0 && (
        <div className="fixed bottom-0 p-4 w-[50vw]">
          <form onSubmit={handleSubmit} >
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
        </div>
      )}

    </>
  );
};

export default ChatGPT;
