'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chat, ChatInput } from '@/ai/flows/chatbot-flow';
import { Skeleton } from '../ui/skeleton';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Halo! Saya Silabot, asisten virtual Anda. Ada yang bisa saya bantu terkait SILAB Berau?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatInput: ChatInput = { message: input };
      const result = await chat(chatInput);
      const botMessage: Message = { role: 'bot', text: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'bot',
        text: 'Maaf, saya sedang mengalami gangguan. Coba lagi nanti ya.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Chatbot error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 shadow-lg group"
        >
          {isOpen ? (
            <X className="h-8 w-8 group-hover:rotate-90 transition-transform" />
          ) : (
            <MessageSquare className="h-8 w-8 group-hover:animate-shake" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <Card className="w-80 shadow-2xl animate-fade-in-up">
            <CardHeader className="flex flex-row items-center gap-4 bg-primary text-primary-foreground p-4 rounded-t-lg">
               <Avatar>
                <AvatarFallback className="bg-primary-foreground text-primary">
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <CardTitle className="text-lg">Silabot</CardTitle>
                <CardDescription className="text-primary-foreground/80">Asisten Virtual</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'bot' && (
                       <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <Bot />
                        </AvatarFallback>
                      </Avatar>
                    )}
                     <div
                      className={`rounded-lg px-3 py-2 max-w-xs ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                     {message.role === 'user' && (
                       <Avatar className="h-8 w-8">
                         <AvatarFallback>U</AvatarFallback>
                       </Avatar>
                     )}
                  </div>
                ))}
                 {isLoading && (
                  <div className="flex items-start gap-3">
                     <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-secondary text-secondary-foreground">
                         <Bot />
                       </AvatarFallback>
                     </Avatar>
                     <div className="rounded-lg px-3 py-2 max-w-xs bg-secondary text-secondary-foreground">
                        <Skeleton className="h-4 w-24" />
                     </div>
                  </div>
                 )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center gap-2">
                <Input
                  placeholder="Ketik pesan..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <Button size="icon" onClick={handleSend} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
