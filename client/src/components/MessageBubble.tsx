import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Attachment {
  type: "image" | "file";
  url: string;
  name: string;
  size?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    initials: string;
  };
  timestamp: string;
  isCurrentUser: boolean;
  attachments?: Attachment[];
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        message.isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
      data-testid={`message-${message.id}`}
    >
      {!message.isCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {message.sender.initials}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col gap-1 max-w-lg",
          message.isCurrentUser ? "items-end" : "items-start"
        )}
      >
        {!message.isCurrentUser && (
          <span className="text-xs font-semibold px-1" data-testid={`text-sender-${message.id}`}>
            {message.sender.name}
          </span>
        )}

        <div
          className={cn(
            "rounded-2xl px-4 py-2",
            message.isCurrentUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm"
          )}
        >
          <p className="text-base whitespace-pre-wrap" data-testid={`text-content-${message.id}`}>
            {message.content}
          </p>

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index}>
                  {attachment.type === "image" ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="rounded-lg max-h-64 cursor-pointer hover-elevate"
                      onClick={() => console.log('Open image:', attachment.url)}
                      data-testid={`image-attachment-${message.id}-${index}`}
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg cursor-pointer hover-elevate",
                        message.isCurrentUser ? "bg-primary-foreground/10" : "bg-background"
                      )}
                      onClick={() => console.log('Download file:', attachment.url)}
                      data-testid={`file-attachment-${message.id}-${index}`}
                    >
                      <FileText className="h-5 w-5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {attachment.name}
                        </div>
                        {attachment.size && (
                          <div className="text-xs opacity-70">{attachment.size}</div>
                        )}
                      </div>
                      <Download className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="text-xs opacity-60 px-1" data-testid={`text-timestamp-${message.id}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
