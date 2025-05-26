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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Invoice } from "@/lib/data";
import { sendInvoiceEmail, generateEmailTemplate } from "@/lib/emailUtils";
import { Mail, Loader2 } from "lucide-react";

interface InvoiceEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const InvoiceEmailDialog = ({
  isOpen,
  onClose,
  invoice,
}: InvoiceEmailDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
    attachPDF: true,
  });

  useEffect(() => {
    if (invoice) {
      setEmailData({
        to: invoice.customerEmail || "",
        subject: `Invoice #${invoice.invoiceNumber} from Goods in Motion`,
        body: generateEmailTemplate(invoice),
        attachPDF: true,
      });
    }
  }, [invoice]);

  if (!invoice) return null;

  const handleSendEmail = async () => {
    if (!emailData.to) {
      toast({
        title: "Error",
        description: "Please enter a recipient email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendInvoiceEmail(invoice, emailData);

      if (result.success) {
        toast({
          title: "Email Prepared",
          description:
            "Your email client has been opened with the invoice details. PDF has been downloaded for attachment.",
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to prepare email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Invoice via Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="email"
              placeholder="customer@example.com"
              value={emailData.to}
              onChange={(e) =>
                setEmailData({ ...emailData, to: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              rows={8}
              value={emailData.body}
              onChange={(e) =>
                setEmailData({ ...emailData, body: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="attachPDF"
              checked={emailData.attachPDF}
              onCheckedChange={(checked) =>
                setEmailData({ ...emailData, attachPDF: checked as boolean })
              }
            />
            <Label htmlFor="attachPDF">Attach PDF copy of invoice</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSendEmail} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Preparing...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceEmailDialog;
