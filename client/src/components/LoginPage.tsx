import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface LoginPageProps {
  onLogin?: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const handleLogin = () => {
    console.log('Replit Auth login triggered');
    // TODO: Integrate with Replit Auth
    onLogin?.();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-app-title">
              Patient Concerns Messenger
            </h1>
            <p className="text-sm text-muted-foreground">
              Secure healthcare communication platform
            </p>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleLogin}
            data-testid="button-login"
          >
            Sign in with Replit
          </Button>

          <div className="w-full space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              For authorized healthcare staff only
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Forgot your password? Click sign in above to access the password reset option
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
