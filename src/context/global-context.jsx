import * as React from "react";

const GlobalContext = React.createContext();

// Estado inicial mejor estructurado
const initialState = {
  messages: [],       // Historial de chats
  currentChat: [],    // Chat actual en memoria
  activeChatId: null, // ID del chat activo
  loading: false,     // Estado de carga
  error: null         // Manejo de errores
};

function globalReducer(state, action) {
  switch (action.type) {
    case "@save_history": {
      if (!state.currentChat?.length) return state;
      
      const chatId = state.activeChatId || Date.now();
      const prevChats = JSON.parse(localStorage.getItem("history")) || [];
      
      const newChat = {
        id: chatId,
        title: state.currentChat[0]?.text?.substring(0, 30) || "Nuevo chat",
        content: state.currentChat,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Actualizar si ya existe o agregar nuevo
      const updatedChats = [
        newChat,
        ...prevChats.filter(chat => chat.id !== chatId)
      ];

      localStorage.setItem("history", JSON.stringify(updatedChats));

      return {
        ...state,
        messages: updatedChats,
        currentChat: [],
        activeChatId: null
      };
    }

    case "@load_messages": {
      const history = JSON.parse(localStorage.getItem("history")) || [];
      return {
        ...state,
        messages: history
      };
    }

    case "@current_chat": {
      return {
        ...state,
        currentChat: action.payload
      };
    }

    case "@select_chat": {
      const selectedChat = state.messages.find(chat => chat.id === action.payload);
      return {
        ...state,
        currentChat: selectedChat?.content || [],
        activeChatId: action.payload
      };
    }

    case "@new_chat": {
      return {
        ...state,
        currentChat: [],
        activeChatId: null
      };
    }

    case "@set_loading": {
      return {
        ...state,
        loading: action.payload
      };
    }

    case "@set_error": {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GlobalProvider({ children }) {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);

  // Cargar mensajes al iniciar
  React.useEffect(() => {
    dispatch({ type: "@load_messages" });
  }, []);

  // Persistencia automática cada 30 segundos
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (state.currentChat.length > 0) {
        dispatch({ type: "@save_history" });
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [state.currentChat]);

  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}

export { GlobalProvider, useGlobal };