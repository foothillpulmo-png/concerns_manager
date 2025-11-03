import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import StatusBadge, { type Status } from "./StatusBadge";

export interface Thread {
  id: string;
  patientName: string;
  patientDOB?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: Status;
  isActive?: boolean;
}

interface ThreadListItemProps {
  thread: Thread;
  onClick: (threadId: string) => void;
}

export default function ThreadListItem({ thread, onClick }: ThreadListItemProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div
      onClick={() => onClick(thread.id)}
      className={cn(
        "relative p-4 cursor-pointer border-b hover-elevate",
        thread.isActive && "bg-accent/50 border-l-4 border-l-primary"
      )}
      data-testid={`thread-item-${thread.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate" data-testid={`text-patient-name-${thread.id}`}>
            {thread.patientName}
          </h3>
          {thread.patientDOB && (
            <p className="text-xs text-muted-foreground">DOB: {thread.patientDOB}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-xs text-muted-foreground" data-testid={`text-timestamp-${thread.id}`}>
            {formatTimestamp(thread.timestamp)}
          </span>
          {thread.unreadCount > 0 && (
            <Badge 
              className="h-5 min-w-5 px-1.5 flex items-center justify-center bg-primary text-primary-foreground"
              data-testid={`badge-unread-${thread.id}`}
            >
              {thread.unreadCount}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-2" data-testid={`text-last-message-${thread.id}`}>
        {thread.lastMessage}
      </p>

      <StatusBadge status={thread.status} />
    </div>
  );
}
