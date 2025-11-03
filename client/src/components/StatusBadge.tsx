import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle, ListTodo, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type Status = "urgent" | "pending" | "overdue" | "tasked" | "done";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  urgent: {
    label: "Urgent",
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive border-destructive/20 font-bold",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-accent/50 text-accent-foreground border-accent-border",
  },
  overdue: {
    label: "Overdue",
    icon: Circle,
    className: "bg-destructive/5 text-destructive/80 border-destructive/10 italic",
  },
  tasked: {
    label: "Tasked",
    icon: ListTodo,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    className: "bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20",
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(config.className, className)}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}
