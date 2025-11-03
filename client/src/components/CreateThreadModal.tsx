import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface CreateThreadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateThread: (data: ThreadFormData) => void;
}

export interface ThreadFormData {
  patientName: string;
  patientDOB: string;
  category: string;
  initialMessage: string;
}

const categories = [
  "General Inquiry",
  "Emergency",
  "Lab Results",
  "Medication",
  "Appointment",
  "Referral",
  "Billing",
  "Insurance",
  "Follow-up",
  "Test Results",
  "Prescription Refill",
  "Other"
];

export default function CreateThreadModal({ open, onOpenChange, onCreateThread }: CreateThreadModalProps) {
  const [formData, setFormData] = useState<ThreadFormData>({
    patientName: "",
    patientDOB: "",
    category: "",
    initialMessage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateThread(formData);
    setFormData({ patientName: "", patientDOB: "", category: "", initialMessage: "" });
    onOpenChange(false);
  };

  const isValid = formData.patientName && formData.category && formData.initialMessage;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">New Patient Thread</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                placeholder="Enter patient name"
                data-testid="input-patient-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientDOB">Date of Birth</Label>
              <Input
                id="patientDOB"
                type="date"
                value={formData.patientDOB}
                onChange={(e) => setFormData(prev => ({ ...prev, patientDOB: e.target.value }))}
                data-testid="input-patient-dob"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialMessage">Initial Message *</Label>
              <Textarea
                id="initialMessage"
                value={formData.initialMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, initialMessage: e.target.value }))}
                placeholder="Describe the patient concern..."
                className="min-h-24 resize-none"
                data-testid="input-initial-message"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              data-testid="button-create-thread"
            >
              Create Thread
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
