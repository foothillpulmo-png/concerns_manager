import ThreadListItem from '../ThreadListItem';

export default function ThreadListItemExample() {
  const mockThreads = [
    {
      id: "1",
      patientName: "John Smith",
      patientDOB: "05/12/1978",
      lastMessage: "Patient reports chest pain for the past 2 hours. Vital signs stable.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      unreadCount: 3,
      status: "urgent" as const,
      isActive: true,
    },
    {
      id: "2",
      patientName: "Maria Garcia",
      patientDOB: "08/22/1985",
      lastMessage: "Follow-up scheduled for next week. Patient doing well.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      unreadCount: 0,
      status: "pending" as const,
    },
    {
      id: "3",
      patientName: "Robert Lee",
      patientDOB: "11/30/1992",
      lastMessage: "Lab results reviewed. All normal.",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      unreadCount: 1,
      status: "done" as const,
    },
  ];

  return (
    <div className="w-96 bg-background border-r">
      {mockThreads.map(thread => (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          onClick={(id) => console.log('Thread clicked:', id)}
        />
      ))}
    </div>
  );
}
