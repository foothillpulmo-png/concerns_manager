import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Settings, LogOut, UserCog } from "lucide-react";
import ThreadListItem, { type Thread } from "./ThreadListItem";
import MessageBubble, { type Message } from "./MessageBubble";
import MessageInput from "./MessageInput";
import ThreadHeader from "./ThreadHeader";
import CreateThreadModal, { type ThreadFormData } from "./CreateThreadModal";
import emptyStateImage from "@assets/generated_images/Empty_chat_conversation_illustration_14202781.png";

interface MessengerAppProps {
  currentUser: {
    name: string;
    initials: string;
    isAdmin: boolean;
  };
  onLogout: () => void;
  onAdminClick?: () => void;
}

export default function MessengerApp({ currentUser, onLogout, onAdminClick }: MessengerAppProps) {
  //TODO: remove mock functionality
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "1",
      patientName: "John Smith",
      patientDOB: "05/12/1978",
      lastMessage: "Patient reports chest pain for the past 2 hours. Vital signs stable.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      unreadCount: 3,
      status: "urgent",
      isActive: true,
    },
    {
      id: "2",
      patientName: "Maria Garcia",
      patientDOB: "08/22/1985",
      lastMessage: "Follow-up scheduled for next week. Patient doing well.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      unreadCount: 0,
      status: "pending",
    },
    {
      id: "3",
      patientName: "Robert Lee",
      patientDOB: "11/30/1992",
      lastMessage: "Lab results reviewed. All normal.",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      unreadCount: 1,
      status: "done",
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Patient reports chest pain for the past 2 hours. Vital signs stable.",
      sender: { name: "Dr. Sarah Johnson", initials: "SJ" },
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isCurrentUser: false,
    },
    {
      id: "2",
      content: "ECG completed. Results attached.",
      sender: { name: currentUser.name, initials: currentUser.initials },
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isCurrentUser: true,
      attachments: [
        { type: "file", url: "#", name: "ECG_Results_Patient_123.pdf", size: "245 KB" }
      ],
    },
  ]);

  const activeThread = threads.find(t => t.id === activeThreadId);
  const filteredThreads = threads.filter(thread =>
    thread.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = 5; // TODO: Get from API

  const handleThreadClick = (threadId: string) => {
    setActiveThreadId(threadId);
    setThreads(prev => prev.map(t =>
      t.id === threadId ? { ...t, isActive: true, unreadCount: 0 } : { ...t, isActive: false }
    ));
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: { name: currentUser.name, initials: currentUser.initials },
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Update thread last message
    setThreads(prev => prev.map(t =>
      t.id === activeThreadId
        ? { ...t, lastMessage: content, timestamp: new Date().toISOString() }
        : t
    ));
  };

  const handleCreateThread = (data: ThreadFormData) => {
    const newThread: Thread = {
      id: Date.now().toString(),
      patientName: data.patientName,
      patientDOB: data.patientDOB,
      lastMessage: data.initialMessage,
      timestamp: new Date().toISOString(),
      unreadCount: 0,
      status: "pending",
      isActive: false,
    };
    setThreads(prev => [newThread, ...prev]);
    console.log('New thread created:', newThread);
  };

  return (
    <div className="h-screen w-full flex bg-background">
      {/* Left Sidebar - Thread List */}
      <div className="w-96 border-r flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-threads"
              />
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsCreateModalOpen(true)}
              data-testid="button-create-thread"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Thread List */}
        <ScrollArea className="flex-1">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No threads found</p>
            </div>
          ) : (
            filteredThreads.map(thread => (
              <ThreadListItem
                key={thread.id}
                thread={thread}
                onClick={handleThreadClick}
              />
            ))
          )}
        </ScrollArea>

        {/* User Profile Section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate text-sm" data-testid="text-current-user-name">
                {currentUser.name}
              </div>
              {currentUser.isAdmin && (
                <Badge variant="secondary" className="text-xs">Admin</Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {currentUser.isAdmin && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onAdminClick}
                  className="relative"
                  data-testid="button-admin-panel"
                >
                  <UserCog className="h-5 w-5" />
                  {pendingCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {pendingCount}
                    </Badge>
                  )}
                </Button>
              )}
              <Button size="icon" variant="ghost" data-testid="button-settings">
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={onLogout}
                data-testid="button-logout-sidebar"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Conversation */}
      <div className="flex-1 flex flex-col">
        {activeThread ? (
          <>
            <ThreadHeader
              patientName={activeThread.patientName}
              patientInfo={activeThread.patientDOB ? `DOB: ${activeThread.patientDOB}` : undefined}
              currentStatus={activeThread.status}
              onStatusChange={(status) => {
                setThreads(prev => prev.map(t =>
                  t.id === activeThreadId ? { ...t, status } : t
                ));
              }}
            />

            <ScrollArea className="flex-1 p-4">
              <div className="max-w-4xl mx-auto">
                {messages.map(message => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>

            <MessageInput
              onSend={handleSendMessage}
              onAttachment={(file) => console.log('Attachment:', file.name)}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <img
              src={emptyStateImage}
              alt="No conversation selected"
              className="h-48 w-48 opacity-50 mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
            <p className="text-muted-foreground mb-6">
              Select a thread from the sidebar or create a new one
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} data-testid="button-create-thread-empty">
              <Plus className="h-4 w-4 mr-2" />
              Create New Thread
            </Button>
          </div>
        )}
      </div>

      <CreateThreadModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateThread={handleCreateThread}
      />
    </div>
  );
}
