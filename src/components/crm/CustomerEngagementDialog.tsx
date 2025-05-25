"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageSquare, Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerEngagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: any;
}

const CustomerEngagementDialog = ({
  isOpen,
  onClose,
  customer,
}: CustomerEngagementDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("email");
  const [emailData, setEmailData] = useState({
    template: "",
    subject: "",
    content: "",
  });
  const [smsData, setSmsData] = useState({
    template: "",
    content: "",
  });
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
  });

  const emailTemplates = [
    {
      id: "welcome",
      name: "Welcome Email",
      subject: "Welcome to Our Service!",
    },
    {
      id: "followup",
      name: "Follow-up",
      subject: "Following up on our conversation",
    },
    {
      id: "proposal",
      name: "Proposal Follow-up",
      subject: "Proposal for your consideration",
    },
  ];

  const smsTemplates = [
    {
      id: "reminder",
      name: "Appointment Reminder",
      content: "Reminder: You have an appointment tomorrow at {{time}}",
    },
    {
      id: "thankyou",
      name: "Thank You",
      content: "Thank you for choosing us! We appreciate your business.",
    },
  ];

  const handleEmailTemplateChange = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setEmailData({
        template: templateId,
        subject: template.subject,
        content: `Dear ${customer?.name || "{{customer_name}}"},\n\n[Template content would be loaded here]\n\nBest regards,\nYour Team`,
      });
    }
  };

  const handleSMSTemplateChange = (templateId: string) => {
    const template = smsTemplates.find((t) => t.id === templateId);
    if (template) {
      setSmsData({
        template: templateId,
        content: template.content.replace(
          "{{customer_name}}",
          customer?.name || "Customer",
        ),
      });
    }
  };

  const handleSendEmail = () => {
    toast({
      title: "Email sent",
      description: `Email sent to ${customer?.name || "customer"} successfully.`,
    });
    onClose();
  };

  const handleSendSMS = () => {
    toast({
      title: "SMS sent",
      description: `SMS sent to ${customer?.phone || "customer"} successfully.`,
    });
    onClose();
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting scheduled",
      description: `Meeting with ${customer?.name || "customer"} has been scheduled.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5" />
            Customer Engagement
            {customer && (
              <div className="flex items-center gap-2 ml-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{customer.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium">{customer.name}</span>
                  <Badge variant="outline" className="ml-2">
                    VIP
                  </Badge>
                </div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="email" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              SMS
            </TabsTrigger>
            <TabsTrigger value="meeting" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Meeting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Template</Label>
                <Select
                  value={emailData.template}
                  onValueChange={handleEmailTemplateChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailData.subject}
                  onChange={(e) =>
                    setEmailData({ ...emailData, subject: e.target.value })
                  }
                  placeholder="Enter email subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-content">Message</Label>
                <Textarea
                  id="email-content"
                  value={emailData.content}
                  onChange={(e) =>
                    setEmailData({ ...emailData, content: e.target.value })
                  }
                  placeholder="Enter your message"
                  rows={8}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSendEmail}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Email
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>SMS Template</Label>
                <Select
                  value={smsData.template}
                  onValueChange={handleSMSTemplateChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {smsTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sms-content">Message</Label>
                <Textarea
                  id="sms-content"
                  value={smsData.content}
                  onChange={(e) =>
                    setSmsData({ ...smsData, content: e.target.value })
                  }
                  placeholder="Enter your SMS message"
                  rows={4}
                />
                <div className="text-sm text-gray-500">
                  Character count: {smsData.content.length}/160
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSendSMS}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send SMS
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meeting" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meeting-title">Meeting Title</Label>
                <Input
                  id="meeting-title"
                  value={meetingData.title}
                  onChange={(e) =>
                    setMeetingData({ ...meetingData, title: e.target.value })
                  }
                  placeholder="Enter meeting title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-date">Date</Label>
                  <Input
                    id="meeting-date"
                    type="date"
                    value={meetingData.date}
                    onChange={(e) =>
                      setMeetingData({ ...meetingData, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-time">Time</Label>
                  <Input
                    id="meeting-time"
                    type="time"
                    value={meetingData.time}
                    onChange={(e) =>
                      setMeetingData({ ...meetingData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting-notes">Notes</Label>
                <Textarea
                  id="meeting-notes"
                  value={meetingData.notes}
                  onChange={(e) =>
                    setMeetingData({ ...meetingData, notes: e.target.value })
                  }
                  placeholder="Meeting agenda or notes"
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleScheduleMeeting}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerEngagementDialog;
