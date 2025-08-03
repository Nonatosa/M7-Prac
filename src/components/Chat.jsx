import { useForm } from 'react-hook-form';
import { SendHorizontal } from 'lucide-react';
import { useGlobal } from '../context/global-context';

export default function Chat() {
  const { state, dispatch } = useGlobal();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ message }) => {
    if (!message.trim()) return;
    
    const newMessage = { text: message, sender: 'user' };
    const updatedChat = [...state.currentChat, newMessage];
    
    dispatch({
      type: "@current_chat",
      payload: updatedChat
    });
    
    reset();
    
    // Disparar acción para Ollama
    dispatch({
      type: "@set_loading",
      payload: true
    });
    
    // Aquí iría la llamada a Ollama, con actualización del estado después
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.currentChat.map((msg, i) => (
          <div
            key={i}
            className={`max-w-3/4 p-3 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-blue-600 ml-auto'
                : 'bg-gray-700 mr-auto'
            }`}
          >
            {msg.text}
            {state.loading && i === state.currentChat.length - 1 && msg.sender === 'bot' && (
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
            disabled={state.loading}
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded-lg disabled:opacity-50"
            disabled={state.loading}
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}