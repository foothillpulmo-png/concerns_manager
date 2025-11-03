import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import StatusBadge, { type Status } from "./StatusBadge";

interface ThreadHeaderProps {
  patientName: string;
  patientInfo?: string;
  currentStatus: Status;
  onStatusChange?: (status: Status) => void;
}

const allStatuses: Status[] = ["urgent", "pending", "overdue", "tasked", "done"];

export default function ThreadHeader({ patientName, patientInfo, currentStatus, onStatusChange }: ThreadHeaderProps) {
  const [activeStatus, setActiveStatus] = useState<Status>(currentStatus);

  const handleStatusClick = (status: Status) => {
    setActiveStatus(status);
    onStatusChange?.(status);
    console.log('Status changed to:', status);
  };

  return (
    <div className="sticky top-0 border-b bg-background p-4 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold truncate" data-testid="text-thread-patient-name">
              {patientName}
            </h2>
            {patientInfo && (
              <p className="text-sm text-muted-foreground" data-testid="text-thread-patient-info">
                {patientInfo}
              </p>
            )}
          </div>
          <Button size="icon" variant="ghost" data-testid="button-thread-info">
            <Info className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={activeStatus === status ? "" : "opacity-50"}
              data-testid={`button-status-${status}`}
            >
              <StatusBadge status={status} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
