// CompanyFormModal Component!!!!
import React, { useState } from "react"; // IMPORTS!!!!!
import { X, Plus } from "lucide-react"; // ICONS IMPORT!!!!!
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter, // DIALOG IMPORTS!!!
} from "../../components/ui/dialog"; // DIALOG COMPONENTS!!!
import { Button } from "../../components/ui/button"; // BUTTON COMPONENT!!!!
import { Input } from "../../components/ui/input"; // INPUT FIELD IMPORT!!!!
import { Label } from "../../components/ui/label"; // LABEL COMPONENT!!!

const CompanyFormModal = ({
  isOpen,
  onClose,
  company,
  companies,
  setCompanies,
}) => {
  const [formData, setFormData] = useState(
    company || {
      name: "",
      location: "",
      linkedinProfile: "",
      emails: [""],
      phoneNumbers: [""],
      comments: "",
      communicationPeriodicity: 14,
      communications: [],
    }
  ); // FORM STATE!!!!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (company) {
      setCompanies(
        companies.map((c) =>
          c.id === company.id ? { ...formData, id: company.id } : c
        )
      );
    } else {
      setCompanies([
        ...companies,
        { ...formData, id: Date.now(), communications: [] },
      ]);
    }
    onClose();
  }; // HANDLE SUBMIT!!!!!
  const handleArrayInput = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  }; // ARRAY INPUT HANDLER!!!!
  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  }; // ADD ARRAY ITEM!!!!!!
  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    }
  }; // REMOVE ARRAY ITEM!!!!

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {" "}
      <DialogContent className="sm:max-w-[500px]">
        {" "}
        <DialogHeader>
          {" "}
          <DialogTitle>
            {company ? "Edit Company" : "Add New Company"}
          </DialogTitle>{" "}
        </DialogHeader>{" "}
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <div>
            {" "}
            <Label htmlFor="name">Company Name</Label>{" "}
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <Label htmlFor="location">Location</Label>{" "}
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              className="mt-1"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <Label htmlFor="linkedin">LinkedIn Profile</Label>{" "}
            <Input
              id="linkedin"
              value={formData.linkedinProfile}
              onChange={(e) =>
                setFormData({ ...formData, linkedinProfile: e.target.value })
              }
              className="mt-1"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <Label>Email Addresses</Label>{" "}
            {formData.emails.map((email, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                {" "}
                <Input
                  value={email}
                  onChange={(e) =>
                    handleArrayInput("emails", index, e.target.value)
                  }
                  type="email"
                  required
                  placeholder="example@company.com"
                />{" "}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("emails", index)}
                >
                  {" "}
                  <X className="h-4 w-4" />{" "}
                </Button>{" "}
                {index === formData.emails.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("emails")}
                  >
                    {" "}
                    <Plus className="h-4 w-4" />{" "}
                  </Button>
                )}{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div>
            {" "}
            <Label>Phone Numbers</Label>{" "}
            {formData.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                {" "}
                <Input
                  value={phone}
                  onChange={(e) =>
                    handleArrayInput("phoneNumbers", index, e.target.value)
                  }
                  type="tel"
                  required
                  placeholder="+1-234-567-8900"
                />{" "}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("phoneNumbers", index)}
                >
                  {" "}
                  <X className="h-4 w-4" />{" "}
                </Button>{" "}
                {index === formData.phoneNumbers.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("phoneNumbers")}
                  >
                    {" "}
                    <Plus className="h-4 w-4" />{" "}
                  </Button>
                )}{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div>
            {" "}
            <Label htmlFor="period">
              Communication Periodicity (days)
            </Label>{" "}
            <Input
              id="period"
              type="number"
              min="1"
              value={formData.communicationPeriodicity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  communicationPeriodicity: parseInt(e.target.value),
                })
              }
              required
              className="mt-1"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <Label htmlFor="comments">Comments</Label>{" "}
            <textarea
              id="comments"
              className="w-full px-3 py-2 border rounded-md mt-1"
              value={formData.comments}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              rows={3}
              placeholder="Additional notes about the company..."
            />{" "}
          </div>{" "}
          <DialogFooter>
            {" "}
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>{" "}
            <Button type="submit">{company ? "Update" : "Add"} Company</Button>{" "}
          </DialogFooter>{" "}
        </form>{" "}
      </DialogContent>{" "}
    </Dialog>
  );
};
export default CompanyFormModal; // EXPORT COMPONENT!!!!
