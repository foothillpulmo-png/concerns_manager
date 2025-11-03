import { useState } from 'react';
import MessageInput from '../MessageInput';

export default function MessageInputExample() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 p-2 bg-muted rounded">
            {msg}
          </div>
        ))}
      </div>
      <MessageInput
        onSend={(msg) => {
          setMessages(prev => [...prev, msg]);
          console.log('Sent:', msg);
        }}
        onAttachment={(file) => console.log('Attachment:', file.name)}
      />
    </div>
  );
}
