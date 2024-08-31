import { create } from "zustand"

const useConversation = create((set) => ({
  conversation: null,
  messages: [],
  setConversation: (conversation) => set(conversation),
  setMessages: (messages) => set(messages),
}))

export default useConversation;