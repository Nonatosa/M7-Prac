import { useForm } from 'react-hook-form';
import { SendHorizontal } from 'lucide-react';
import useOllamaHook from '../api/useOllamaHook';

export default function Chat({ messages, setMessages }) {
  const ollama = useOllamaHook();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ message }) => {
    const userMessage = { text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    reset();
    ollama.handleSubmit(message);
  };

  // Efecto para actualizar mensajes del bot
  React.useEffect(() => {
    if (!ollama.response) return;

    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.sender === 'bot') {
        return [...prev.slice(0, -1), { ...lastMessage, text: ollama.response }];
      }
      return [...prev, { text: ollama.response, sender: 'bot' }];
    });
  }, [ollama.response]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-3/4 p-3 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-blue-600 ml-auto'
                : 'bg-gray-700 mr-auto'
            }`}
          >
            {msg.text}
            {ollama.loading && i === messages.length - 1 && msg.sender === 'bot' && (
              <span className="inline-block ml-2 animate-pulse">...</span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            {...register('message', { required: true })}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 bg-gray-700 rounded-lg focus:outline-none"
            disabled={ollama.loading}
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded-lg disabled:opacity-50"
            disabled={ollama.loading}
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}