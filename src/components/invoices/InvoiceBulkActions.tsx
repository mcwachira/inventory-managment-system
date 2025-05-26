import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Mail, Trash2, CheckSquare, Square } from "lucide-react";

interface InvoiceBulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onEmail: () => void;
  onDownload: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

const InvoiceBulkActions = ({
  selectedCount,
  onDelete,
  onEmail,
  onDownload,
  onSelectAll,
  onClearSelection,
}: InvoiceBulkActionsProps) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <span className="text-sm font-medium text-blue-900">
        {selectedCount} invoice{selectedCount !== 1 ? "s" : ""} selected
      </span>

      <div className="flex items-center gap-1 ml-auto">
        <Button variant="outline" size="sm" onClick={onSelectAll}>
          <CheckSquare className="h-4 w-4 mr-1" />
          Select All
        </Button>

        <Button variant="outline" size="sm" onClick={onClearSelection}>
          <Square className="h-4 w-4 mr-1" />
          Clear
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default InvoiceBulkActions;
