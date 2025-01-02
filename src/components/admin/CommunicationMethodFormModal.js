// Communication Method Form Modal !!!!!!
import React, { useState } from 'react'; // React IMPORT!
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, // DIALOG IMPORT!!!!
} from "../../components/ui/dialog"; // !!!!!! UI COMPONENTS
import { Button } from "../../components/ui/button"; // BUTTON COMPONENT!!
import { Input } from "../../components/ui/input"; // INPUT COMPONENT!!!!!!!
import { Label } from "../../components/ui/label"; // LABELS!!!
import { Checkbox } from "../../components/ui/checkbox"; // CHECKBOX!! COMPONENT!

const CommunicationMethodFormModal = ({ isOpen, onClose, method, methods, setMethods }) => {
  const [formData, setFormData] = useState(method || { // FORM STATE!!!!!!!
    name: '', // NAME DEFAULT
    description: '', // DESCRIPTION EMPTY
    sequence: methods.length + 1, // NEXT IN SEQUENCE!!!!
    mandatory: false // NOT MANDATORY BY DEFAULT!
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // PREVENT DEFAULT SUBMIT BEHAVIOR!!!
    if (method) { // IF METHOD EXISTS
      setMethods(methods.map(m => m.id === method.id ? { ...formData, id: method.id } : m)); // EDIT EXISTING METHOD!!!!
    } else { // ELSE ADD NEW METHOD
      setMethods([...methods, { ...formData, id: Date.now() }]); // PUSH NEW METHOD TO ARRAY
    }
    onClose(); // CLOSE THE MODAL!!!!!!
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}> {/* DIALOG COMPONENT!!!!! */}
      <DialogContent className="sm:max-w-[500px]"> {/* CONTENT!!!! */}
        <DialogHeader> {/* HEADER COMPONENT!!!!!! */}
          <DialogTitle>
            {method ? 'Edit Communication Method' : 'Add New Communication Method'} {/* TITLE DYNAMIC!!! */}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4"> {/* FORM WITH SPACE!!!!! */}
          <div>
            <Label htmlFor="name">Method Name</Label> {/* LABEL FOR NAME!!! */}
            <Input
              id="name"
              value={formData.name} // FORM NAME VALUE!!!!
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} // SET NAME!!!
              required
              className="mt-1"
              placeholder="e.g., LinkedIn Post" // PLACEHOLDER!!!!
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label> {/* LABEL DESCRIPTION!! */}
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded-md mt-1" // STYLING!!!!
              value={formData.description} // FORM DESCRIPTION!!!!
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} // SET DESCRIPTION!!!
              rows={3}
              required
              placeholder="Describe the communication method..." // PLACEHOLDER TEXT!!!!
            />
          </div>

          <div>
            <Label htmlFor="sequence">Sequence</Label> {/* SEQUENCE LABEL!!!!! */}
            <Input
              id="sequence"
              type="number" // INPUT TYPE NUMBER!!!
              min="1" // MINIMUM VALUE IS 1!!!
              value={formData.sequence} // FORM SEQUENCE VALUE!!!
              onChange={(e) => setFormData({ ...formData, sequence: parseInt(e.target.value) })} // SET SEQUENCE!!!!
              required
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1"> {/* HINT TEXT!!!!! */}
              Order in which this method should appear in the sequence
            </p>
          </div>

          <div className="flex items-center space-x-2"> {/* FLEX CONTAINER FOR CHECKBOX!!!!!! */}
            <Checkbox
              id="mandatory" // CHECKBOX ID!!!
              checked={formData.mandatory} // CHECKED STATE!!!
              onCheckedChange={(checked) => setFormData({ ...formData, mandatory: checked })} // SET MANDATORY!!!!!
            />
            <Label htmlFor="mandatory">Mandatory in communication sequence</Label> {/* LABEL FOR CHECKBOX!!! */}
          </div>

          <DialogFooter> {/* FOOTER COMPONENT!!!! */}
            <Button type="button" variant="outline" onClick={onClose}> {/* OUTLINE BUTTON!!! */}
              Cancel
            </Button>
            <Button type="submit"> {/* SUBMIT BUTTON!!!! */}
              {method ? 'Update' : 'Add'} Method {/* DYNAMIC TEXT BUTTON!!! */}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationMethodFormModal; // EXPORT THE COMPONENT!!!!
