'use client';

import { useChat } from 'ai/react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="min-h-screen p-4 bg-black text-white">
      <h1 className="text-xl font-bold mb-4">Chat with DeepSeek</h1>
      <div className="space-y-2 mb-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <p><strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}