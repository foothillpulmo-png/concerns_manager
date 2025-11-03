import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Send, Image, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (message: string) => void;
  onAttachment?: (file: File) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, onAttachment, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (type: 'image' | 'file') => {
    const input = type === 'image' ? imageInputRef.current : fileInputRef.current;
    input?.click();
    setIsPopoverOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachment) {
      onAttachment(file);
      console.log('File selected:', file.name);
    }
    e.target.value = '';
  };

  return (
    <div className="sticky bottom-0 border-t bg-background p-4">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full flex-shrink-0"
              disabled={disabled}
              data-testid="button-attachment"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-48 p-2">
            <div className="space-y-1">
              <button
                onClick={() => handleFileSelect('image')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover-elevate text-left"
                data-testid="button-attach-image"
              >
                <Image className="h-5 w-5 text-primary" />
                <span className="text-sm">Photo</span>
              </button>
              <button
                onClick={() => handleFileSelect('file')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover-elevate text-left"
                data-testid="button-attach-file"
              >
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm">Document</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className={cn(
              "w-full resize-none rounded-full px-4 py-3 pr-12",
              "bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring",
              "max-h-32 min-h-[48px]"
            )}
            rows={1}
            data-testid="input-message"
          />
        </div>

        <Button
          size="icon"
          className="rounded-full flex-shrink-0"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          data-testid="button-send"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
