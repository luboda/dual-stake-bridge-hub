
import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { RPCForm, type RPCCredentials } from '@/components/RPCForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Send, Zap, Key, UserPlus, Brain } from 'lucide-react';

export default function Index() {
  const { toast } = useToast();
  const [publicKey, setPublicKey] = React.useState('');

  const handleRPCSubmit = (credentials: RPCCredentials) => {
    toast({
      title: "Credentials saved",
      description: "Your RPC credentials have been saved successfully.",
    });
  };

  const handleOperation = (operation: string) => {
    toast({
      title: "Operation initiated",
      description: `${operation} operation has been started.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slideIn">
        <section id="rpc" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">RPC Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RPCForm title="MCL RPC Credentials" onSubmit={handleRPCSubmit} />
            <RPCForm title="VRSC RPC Credentials" onSubmit={handleRPCSubmit} />
            <RPCForm title="Marmara@ RPC Credentials" onSubmit={handleRPCSubmit} />
          </div>
          
          <Card className="backdrop-blur-xl bg-card/50 border border-white/10">
            <CardHeader>
              <CardTitle>DeepSeek-R1 API Endpoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deepseek-host">Host</Label>
                <Input id="deepseek-host" placeholder="Enter DeepSeek-R1 host" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deepseek-port">Port</Label>
                <Input id="deepseek-port" placeholder="Enter DeepSeek-R1 port" className="bg-background/50" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="operations" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="backdrop-blur-xl bg-card/50 border border-white/10">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Button 
                    onClick={() => handleOperation("Lock MCL")}
                    className="w-full bg-primary hover:bg-primary/80"
                  >
                    <Lock className="mr-2 h-4 w-4" /> Lock MCL Coins
                  </Button>
                  <Button 
                    onClick={() => handleOperation("Bridge MCL")}
                    className="w-full bg-secondary hover:bg-secondary/80"
                  >
                    <Send className="mr-2 h-4 w-4" /> Bridge MCL to Marmara@
                  </Button>
                  <Button 
                    onClick={() => handleOperation("Enable Staking")}
                    className="w-full bg-accent hover:bg-accent/80"
                  >
                    <Zap className="mr-2 h-4 w-4" /> Enable VRSC Staking
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-card/50 border border-white/10">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="public-key">Public Key</Label>
                    <Input
                      id="public-key"
                      placeholder="Enter public key"
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  <Button 
                    onClick={() => handleOperation("Issue Verus ID")}
                    className="w-full bg-primary hover:bg-primary/80"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Issue Verus ID
                  </Button>
                  <Button 
                    onClick={() => handleOperation("Optimize Staking")}
                    className="w-full bg-secondary hover:bg-secondary/80"
                  >
                    <Brain className="mr-2 h-4 w-4" /> Optimize with DeepSeek-R1
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-card/50 border border-white/10">
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">MCL Staking: Active</p>
                  <p className="text-sm text-muted-foreground">VRSC Mining: Inactive</p>
                  <p className="text-sm text-muted-foreground">Marmara@ Bridge: Connected</p>
                  <p className="text-sm text-muted-foreground">DeepSeek-R1: Optimizing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
