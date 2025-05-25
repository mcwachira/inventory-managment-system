"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Edit, Trash, Mail, MessageSquare, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockEmailTemplates, mockSMSTemplates } from "@/lib/data";
import TemplateDialog from "./TemplateDialog";

const CommunicationTemplates = () => {
  const { toast } = useToast();
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("email");

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setIsTemplateDialogOpen(true);
  };

  const handleCopyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.content);
    toast({
      title: "Template copied",
      description: "Template content copied to clipboard",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "onboarding":
        return "bg-blue-100 text-blue-800";
      case "sales":
        return "bg-green-100 text-green-800";
      case "billing":
        return "bg-orange-100 text-orange-800";
      case "reminder":
        return "bg-purple-100 text-purple-800";
      case "order":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Communication Templates</h2>
        <Button onClick={() => setIsTemplateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <Tabs defaultValue="email" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            SMS Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div className="grid gap-4">
            {mockEmailTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {template.subject}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Used {template.usage} times
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                      {template.content.substring(0, 150)}...
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Last modified:{" "}
                        {new Date(template.lastModified).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyTemplate(template)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <div className="grid gap-4">
            {mockSMSTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Used {template.usage} times
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded border text-sm">
                      {template.content}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Last modified:{" "}
                        {new Date(template.lastModified).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyTemplate(template)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <TemplateDialog
        isOpen={isTemplateDialogOpen}
        onClose={() => {
          setIsTemplateDialogOpen(false);
          setSelectedTemplate(null);
        }}
        template={selectedTemplate}
        type={activeTab as "email" | "sms"}
      />
    </div>
  );
};

export default CommunicationTemplates;
