"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Upload,
  Settings,
  Shield,
  Database,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [auditLogs] = useState([
    {
      id: "1",
      timestamp: "2024-01-15 10:30:00",
      user: "John Smith",
      action: "User Login",
      resource: "Authentication",
      status: "Success",
      ipAddress: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2024-01-15 10:25:00",
      user: "Sarah Johnson",
      action: "Item Created",
      resource: "Inventory",
      status: "Success",
      ipAddress: "192.168.1.101",
    },
    {
      id: "3",
      timestamp: "2024-01-15 10:20:00",
      user: "Admin",
      action: "Settings Updated",
      resource: "Configuration",
      status: "Success",
      ipAddress: "192.168.1.1",
    },
    {
      id: "4",
      timestamp: "2024-01-15 10:15:00",
      user: "Mike Wilson",
      action: "Failed Login",
      resource: "Authentication",
      status: "Failed",
      ipAddress: "192.168.1.102",
    },
  ]);

  const { toast } = useToast();

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simulate backup progress
    for (let i = 0; i <= 100; i += 10) {
      setBackupProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setIsBackingUp(false);
    toast({
      title: "Backup completed",
      description: "System backup has been created successfully.",
    });
  };

  const handleRestore = () => {
    toast({
      title: "Restore initiated",
      description: "System restore process has been started.",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Success":
        return "default";
      case "Failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Backup & Restore */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Data Backup & Restore
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Create Backup</h3>
              <p className="text-sm text-muted-foreground">
                Create a complete backup of your system data including
                inventory, users, and configurations.
              </p>
              {isBackingUp && (
                <div className="space-y-2">
                  <Progress value={backupProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    {backupProgress}% complete
                  </p>
                </div>
              )}
              <Button
                onClick={handleBackup}
                disabled={isBackingUp}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isBackingUp ? "Creating Backup..." : "Create Backup"}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Restore Data</h3>
              <p className="text-sm text-muted-foreground">
                Restore your system from a previous backup. This will overwrite
                current data.
              </p>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select backup file" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backup-2024-01-15">
                      Backup - January 15, 2024
                    </SelectItem>
                    <SelectItem value="backup-2024-01-14">
                      Backup - January 14, 2024
                    </SelectItem>
                    <SelectItem value="backup-2024-01-13">
                      Backup - January 13, 2024
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Backup File
                </Button>
              </div>
              <Button
                onClick={handleRestore}
                variant="destructive"
                className="w-full"
              >
                Restore Data
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Backup Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Frequency</label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Select defaultValue="02:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="02:00">2:00 AM</SelectItem>
                    <SelectItem value="03:00">3:00 AM</SelectItem>
                    <SelectItem value="04:00">4:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Retention</label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Audit Trail & Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-users">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-users">All Users</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="managers">Managers</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(log.status)}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ipAddress}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* System Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            System Security & Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Security Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Password expiration</span>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Session timeout</span>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Login attempts</span>
                  <Select defaultValue="5">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">System Maintenance</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Optimize Database
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Check System Health
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Update System
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
