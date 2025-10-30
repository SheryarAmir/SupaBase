import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import type { Message } from "@/types/dashboard";

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "John Doe",
    content: "Hi, is this product still available?",
    timestamp: "2025-01-24 10:30",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "Yes! It's in stock. Would you like to place an order?",
    timestamp: "2025-01-24 10:35",
    isOwn: true,
  },
  {
    id: "3",
    sender: "John Doe",
    content: "Great! Can you ship to New York?",
    timestamp: "2025-01-24 10:40",
    isOwn: false,
  },
  {
    id: "4",
    sender: "You",
    content: "Absolutely! We ship nationwide.",
    timestamp: "2025-01-24 10:42",
    isOwn: true,
  },
  {
    id: "5",
    sender: "Sarah Williams",
    content: "Do you offer bulk discounts?",
    timestamp: "2025-01-24 11:15",
    isOwn: false,
  },
  {
    id: "6",
    sender: "You",
    content: "Yes! For orders over 10 units, we offer 15% off.",
    timestamp: "2025-01-24 11:20",
    isOwn: true,
  },
];

export function Messages() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Messages & Inquiries
        </h1>
        <p className="text-muted-foreground mt-2">
          Communicate with your customers
        </p>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Customer Messages</CardTitle>
          <CardDescription>Recent conversations with buyers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-96 overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isOwn
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">
                        {message.sender}
                      </span>
                      <span
                        className={`text-xs ${
                          message.isOwn ? "opacity-70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-accent"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
