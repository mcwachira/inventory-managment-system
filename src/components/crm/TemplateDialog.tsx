"use client";
import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface TemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template?: any;
  type: "email" | "sms";
}

const TemplateDialog = ({
  isOpen,
  onClose,
  template,
  type,
}: TemplateDialogProps) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || "",
        subject: template.subject || "",
        content: template.content || "",
        category: template.category || "",
      });
    } else {
      setFormData({
        name: "",
        subject: "",
        content: "",
        category: "",
      });
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: template ? "Template updated" : "Template created",
      description: `${type === "email" ? "Email" : "SMS"} template has been ${template ? "updated" : "created"} successfully.`,
    });
    onClose();
  };

  const placeholders = [
    "{{customer_name}}",
    "{{company_name}}",
    "{{order_number}}",
    "{{amount}}",
    "{{date}}",
    "{{time}}",
    "{{address}}",
    "{{phone}}",
  ];

  const categories =
    type === "email"
      ? ["onboarding", "sales", "billing", "support", "marketing"]
      : ["reminder", "order", "delivery", "confirmation", "notification"];

  const insertPlaceholder = (placeholder: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const content = formData.content;
    const newContent =
      content.substring(0, start) + placeholder + content.substring(end);

    setFormData({ ...formData, content: newContent });

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + placeholder.length,
        start + placeholder.length,
      );
    }, 0);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {template ? "Edit" : "Create"} {type === "email" ? "Email" : "SMS"}{" "}
            Template
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter template name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Enter email subject"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Content</Label>
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs text-gray-500">Insert:</span>
                {placeholders.slice(0, 4).map((placeholder) => (
                  <Badge
                    key={placeholder}
                    variant="outline"
                    className="cursor-pointer text-xs"
                    onClick={() => insertPlaceholder(placeholder)}
                  >
                    {placeholder}
                  </Badge>
                ))}
              </div>
            </div>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder={
                type === "email"
                  ? "Enter your email template content..."
                  : "Enter your SMS template content..."
              }
              rows={type === "email" ? 8 : 4}
              required
            />
            <div className="flex gap-1 flex-wrap mt-2">
              {placeholders.slice(4).map((placeholder) => (
                <Badge
                  key={placeholder}
                  variant="outline"
                  className="cursor-pointer text-xs"
                  onClick={() => insertPlaceholder(placeholder)}
                >
                  {placeholder}
                </Badge>
              ))}
            </div>
          </div>

          {type === "sms" && (
            <div className="text-sm text-gray-500">
              Character count: {formData.content.length}/160
              {formData.content.length > 160 && (
                <span className="text-red-500 ml-2">
                  (This message will be sent as{" "}
                  {Math.ceil(formData.content.length / 160)} parts)
                </span>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {template ? "Update" : "Create"} Template
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
