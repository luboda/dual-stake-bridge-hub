
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RPCFormProps {
  title: string;
  onSubmit: (credentials: RPCCredentials) => void;
}

export interface RPCCredentials {
  host: string;
  port: string;
  user: string;
  password: string;
}

export const RPCForm = ({ title, onSubmit }: RPCFormProps) => {
  const [credentials, setCredentials] = React.useState<RPCCredentials>({
    host: '',
    port: '',
    user: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <Card className="backdrop-blur-xl bg-card/50 border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              placeholder="Enter host"
              value={credentials.host}
              onChange={(e) => setCredentials(prev => ({ ...prev, host: e.target.value }))}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              placeholder="Enter port"
              value={credentials.port}
              onChange={(e) => setCredentials(prev => ({ ...prev, port: e.target.value }))}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">Username</Label>
            <Input
              id="user"
              placeholder="Enter username"
              value={credentials.user}
              onChange={(e) => setCredentials(prev => ({ ...prev, user: e.target.value }))}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="bg-background/50"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
