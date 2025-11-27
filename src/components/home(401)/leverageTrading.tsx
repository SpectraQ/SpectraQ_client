import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export const LeverageTrading = () => {
  const [leverage, setLeverage] = useState([5]);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("long");

  return (
    <section id="trading" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Leverage Trading</h2>
          <p className="text-muted-foreground">
            Open leveraged positions on major cryptocurrencies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Trading Interface */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle>Open Position</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="long"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Long
                  </TabsTrigger>

                  <TabsTrigger
                    value="short"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Short
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Asset</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          variant="outline"
                          className="border text-primary"
                        >
                          BTC
                        </Button>
                        <Button variant="outline">ETH</Button>
                        <Button variant="outline">SOL</Button>
                      </div>
                    </div>

                    <div>
                      <Label>Amount (USD)</Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Leverage</Label>
                        <span className="text-primary font-medium">
                          {leverage[0]}x
                        </span>
                      </div>
                      <Slider
                        value={leverage}
                        onValueChange={setLeverage}
                        max={50}
                        min={1}
                        step={1}
                        className="my-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1x</span>
                        <span>25x</span>
                        <span>50x</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Position Value
                        </div>
                        <div className="text-lg font-bold">
                          $
                          {amount
                            ? (
                                parseFloat(amount) * leverage[0]
                              ).toLocaleString()
                            : "0"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Liquidation Price
                        </div>
                        <div className="text-lg font-bold text-destructive">
                          $92,450
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={activeTab === "long" ? "default" : "destructive"}
                      className="w-full bg-green-600 text-white"
                      size="lg"
                    >
                      Open {activeTab === "long" ? "Long" : "Short"} Position
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Open Positions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold">BTC-USD</div>
                      <div className="text-sm text-muted-foreground">
                        10x Long
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white">+12.4%</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entry</span>
                      <span className="font-medium">$96,420</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PnL</span>
                      <span className="font-medium text-green-600">
                        +$6,200
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full mt-3 bg-quantum-red"
                  >
                    Close Position
                  </Button>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold">ETH-USD</div>
                      <div className="text-sm text-muted-foreground">
                        5x Long
                      </div>
                    </div>
                    <Badge variant="destructive">-3.2%</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">$25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entry</span>
                      <span className="font-medium">$3,950</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PnL</span>
                      <span className="font-medium text-destructive">
                        -$800
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full mt-3 bg-quantum-red"
                  >
                    Close Position
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
