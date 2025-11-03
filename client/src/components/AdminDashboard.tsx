import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check, X, UserPlus } from "lucide-react";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  requestedAt: string;
}

export default function AdminDashboard() {
  //TODO: remove mock functionality
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([
    { id: "1", name: "Dr. Sarah Johnson", email: "sarah.j@hospital.com", requestedAt: "2024-11-03" },
    { id: "2", name: "Nurse Mike Chen", email: "m.chen@hospital.com", requestedAt: "2024-11-02" },
    { id: "3", name: "Admin Lisa Park", email: "l.park@hospital.com", requestedAt: "2024-11-01" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (userId: string) => {
    console.log('Approve user:', userId);
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    //TODO: Call API to approve user
  };

  const handleDeny = (userId: string) => {
    console.log('Deny user:', userId);
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    //TODO: Call API to deny user
  };

  const filteredUsers = pendingUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <UserPlus className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold" data-testid="text-admin-title">
              Employee Authorization
            </h1>
          </div>
          <p className="text-muted-foreground">
            Review and approve access requests from new employees
          </p>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-users"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p data-testid="text-no-requests">No pending requests</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                  data-testid={`row-user-${user.id}`}
                >
                  <div className="flex-1">
                    <div className="font-semibold" data-testid={`text-username-${user.id}`}>
                      {user.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Requested: {new Date(user.requestedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(user.id)}
                      data-testid={`button-approve-${user.id}`}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeny(user.id)}
                      data-testid={`button-deny-${user.id}`}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {pendingUsers.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" data-testid="badge-pending-count">
                  {pendingUsers.length}
                </Badge>
                pending request{pendingUsers.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
