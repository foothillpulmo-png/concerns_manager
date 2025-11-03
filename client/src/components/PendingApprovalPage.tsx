import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import pendingApprovalImage from "@assets/generated_images/Pending_approval_healthcare_illustration_49d9ca27.png";

interface PendingApprovalPageProps {
  onLogout?: () => void;
}

export default function PendingApprovalPage({ onLogout }: PendingApprovalPageProps) {
  const handleLogout = () => {
    console.log('Logout triggered');
    // TODO: Implement logout
    onLogout?.();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg p-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <img 
            src={pendingApprovalImage} 
            alt="Pending approval" 
            className="h-48 w-48 opacity-80"
          />
          
          <div>
            <h2 className="text-2xl font-semibold mb-2" data-testid="text-pending-title">
              Access Pending
            </h2>
            <p className="text-muted-foreground">
              Your account is awaiting admin approval. You'll receive access once an administrator reviews your request.
            </p>
          </div>

          <div className="w-full p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              If you have questions, please contact your system administrator.
            </p>
          </div>

          <Button 
            variant="outline" 
            onClick={handleLogout}
            data-testid="button-logout"
          >
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
