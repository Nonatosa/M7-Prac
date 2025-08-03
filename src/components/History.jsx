import React from "react";
import { NewChatIcon } from "../assets/new-chat-icon.jsx";
import { useGlobal } from "../context/global-context.jsx";

export default function History() {
  const { state, dispatch } = useGlobal();

  const handleNewChat = () => {
    if (state.currentChat.length > 0) {
      dispatch({ type: "@save_history" });
    }
    dispatch({ type: "@new_chat" });
  };

  const selectChat = (chatId) => {
    dispatch({ type: "@select_chat", payload: chatId });
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white p-4">
      <div className="flex flex-col items-start">
        <button
          className="flex p-2 bg-blue-600 rounded-lg w-full hover:bg-blue-700 mb-4"
          onClick={handleNewChat}
        >
          <NewChatIcon />
          Nuevo chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {state.messages.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 rounded-lg cursor-pointer ${
                chat.id === state.activeChatId
                  ? "bg-blue-700"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => selectChat(chat.id)}
            >
              <p className="font-medium truncate">{chat.title}</p>
              <p className="text-xs text-gray-400">
                {new Date(chat.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}