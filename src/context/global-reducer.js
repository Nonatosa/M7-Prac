export default function globalReducer(state, action) {
  switch (action.type) {
    case '@load_messages':
      return {
        ...state,
        messages: JSON.parse(localStorage.getItem('chatHistory')) || []
      };
    
    case '@current_chat':
      return {
        ...state,
        currentChat: action.payload
      };
      
    case '@save_history':
      const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
      const newChat = {
        id: Date.now(),
        title: state.currentChat[0]?.text?.substring(0, 30) || 'Nuevo chat',
        date: new Date().toISOString()
      };
      localStorage.setItem('chatHistory', JSON.stringify([newChat, ...history]));
      return state;
      
    default:
      return state;
  }
}