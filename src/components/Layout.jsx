import { useState } from 'react';
import History from './History';
import Chat from './Chat';

export default function Layout() {
  const [messages, setMessages] = useState([]);

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <History onNewChat={handleNewChat} />
      <Chat messages={messages} setMessages={setMessages} />
    </div>
  );
}