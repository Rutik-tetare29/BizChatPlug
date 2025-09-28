import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your chatbot configuration and preferences.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>General</CardTitle>
                    <CardDescription>
                        General settings for your chatbot widget.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="chatbot-name">Chatbot Name</Label>
                        <Input id="chatbot-name" defaultValue="BizChat Support" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="welcome-message">Welcome Message</Label>
                        <Input id="welcome-message" defaultValue="Hello! How can I help you today?" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Escalation</CardTitle>
                    <CardDescription>
                        Configure where to send notifications for human agent escalation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" placeholder="https://your-api.com/escalate" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
