"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, UserPlus } from "lucide-react";
import { mockUsers, UserRole } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const UsersRolesSettings = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
  });

  const { toast } = useToast();

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    inventory_manager: "bg-blue-100 text-blue-800",
    sales_staff: "bg-green-100 text-green-800",
    purchasing_agent: "bg-purple-100 text-purple-800",
    viewer: "bg-gray-100 text-gray-800",
  };

  const roleLabels = {
    admin: "Administrator",
    inventory_manager: "Inventory Manager",
    sales_staff: "Sales Staff",
    purchasing_agent: "Purchasing Agent",
    viewer: "Viewer",
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const user = {
      id: `u${Date.now()}`,
      ...newUser,
    };

    setUsers((prev) => [...prev, user]);
    setNewUser({ name: "", email: "", role: "viewer" });
    setIsAddUserOpen(false);

    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    toast({
      title: "User removed",
      description: "User has been removed successfully.",
    });
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
    toast({
      title: "Role updated",
      description: "User role has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Role Permissions Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Badge className={roleColors.admin}>Administrator</Badge>
              <p className="text-sm text-muted-foreground">
                Full system access and management
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={roleColors.inventory_manager}>
                Inventory Manager
              </Badge>
              <p className="text-sm text-muted-foreground">
                Manage items, inventory, and warehouses
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={roleColors.sales_staff}>Sales Staff</Badge>
              <p className="text-sm text-muted-foreground">
                Manage sales, customers, and invoices
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={roleColors.purchasing_agent}>
                Purchasing Agent
              </Badge>
              <p className="text-sm text-muted-foreground">
                Manage purchases and vendors
              </p>
            </div>
            <div className="space-y-2">
              <Badge className={roleColors.viewer}>Viewer</Badge>
              <p className="text-sm text-muted-foreground">
                Read-only access to reports
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">User Management</CardTitle>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Name</Label>
                  <Input
                    id="user-name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter user name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: UserRole) =>
                      setNewUser((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="inventory_manager">
                        Inventory Manager
                      </SelectItem>
                      <SelectItem value="sales_staff">Sales Staff</SelectItem>
                      <SelectItem value="purchasing_agent">
                        Purchasing Agent
                      </SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddUserOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: UserRole) =>
                        handleRoleChange(user.id, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue>
                          <Badge className={roleColors[user.role]}>
                            {roleLabels[user.role]}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="inventory_manager">
                          Inventory Manager
                        </SelectItem>
                        <SelectItem value="sales_staff">Sales Staff</SelectItem>
                        <SelectItem value="purchasing_agent">
                          Purchasing Agent
                        </SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersRolesSettings;
