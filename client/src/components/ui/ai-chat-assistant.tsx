
import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you find the right tool for your needs. What would you like to do?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response (you can integrate with actual AI API later)
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('pdf') && lowerQuery.includes('merge')) {
      return 'For merging PDFs, use our PDF Merger tool! It can combine multiple PDFs into one. Go to Tools → PDF → PDF Merger';
    }
    if (lowerQuery.includes('background') && lowerQuery.includes('remove')) {
      return 'Our Background Remover uses AI to automatically remove backgrounds from images. Check Tools → Image → Background Remover';
    }
    if (lowerQuery.includes('compress') && lowerQuery.includes('image')) {
      return 'Use our Image Compressor to reduce file size while maintaining quality. Find it in Tools → Image → Image Compressor';
    }
    if (lowerQuery.includes('video') && lowerQuery.includes('convert')) {
      return 'Our Video Converter supports multiple formats. Go to Tools → Media → Video Converter for all your conversion needs';
    }
    
    return 'I can help you with PDF processing, image editing, video/audio tools, and government document validation. What specific task do you need help with?';
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg z-50"
      >
        🤖
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">Suntyn AI Assistant</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            ✕
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
