import React, { useState } from "react"; // Import React and hooks
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Dialog components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Select components
import { Button } from "@/components/ui/button"; // Button component
import { Input } from "@/components/ui/input"; // Input component
import { Label } from "@/components/ui/label"; // Label component

const CommunicationModal = ({
  isOpen = false,
  onClose,
  companies = [],
  allCompanies = [],
  setCompanies,
  communicationMethods = [],
}) => {
  const [formData, setFormData] = useState({
    type: communicationMethods[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  }); // State for form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCompanies = allCompanies.map((company) => {
      if (companies.includes(company)) {
        return {
          ...company,
          communications: [
            {
              type:
                communicationMethods.find((m) => m.id === formData.type)
                  ?.name || "Other",
              date: formData.date,
              notes: formData.notes,
            },
            ...(company.communications || []),
          ],
        };
      }
      return company;
    });
    setCompanies(updatedCompanies);
    onClose();
  }; // Handle form submission

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Communication</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Selected Companies</Label>
            <div className="mt-2 space-y-1">
              {companies.map((company) => (
                <div key={company.id} className="text-sm font-medium">
                  {company.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="type">Communication Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {communicationMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add any additional notes about the communication..."
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Log Communication</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationModal;
