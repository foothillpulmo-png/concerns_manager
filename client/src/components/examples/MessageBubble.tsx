import MessageBubble from '../MessageBubble';

export default function MessageBubbleExample() {
  const mockMessages = [
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
      sender: { name: "You", initials: "ME" },
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isCurrentUser: true,
      attachments: [
        { type: "file" as const, url: "#", name: "ECG_Results_Patient_123.pdf", size: "245 KB" }
      ],
    },
    {
      id: "3",
      content: "Thanks! Reviewing now. Will update status shortly.",
      sender: { name: "Dr. Sarah Johnson", initials: "SJ" },
      timestamp: new Date().toISOString(),
      isCurrentUser: false,
    },
  ];

  return (
    <div className="p-4 bg-background max-w-3xl">
      {mockMessages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
