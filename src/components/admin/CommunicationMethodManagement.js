// CommunicationMethodManagement COMPONENT!!!!!!!!
import React, { useState } from "react"; // !!!!IMPORTS!!!
import { Plus, Edit, Trash, ArrowUp, ArrowDown } from "lucide-react"; // ICONS COMPONENTS!!!!
import { Button } from "../../components/ui/button"; // BUTTON IMPORT!!!!!!
import CommunicationMethodFormModal from "./CommunicationMethodFormModal"; // MODAL FORM IMPORT!!!

const CommunicationMethodManagement = ({ methods, setMethods }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const handleDelete = (methodId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this communication method?"
      )
    ) {
      setMethods(methods.filter((m) => m.id !== methodId));
    }
  };
  const handleMoveUp = (index) => {
    if (index > 0) {
      const newMethods = [...methods];
      [newMethods[index - 1], newMethods[index]] = [
        newMethods[index],
        newMethods[index - 1],
      ];
      newMethods[index - 1].sequence--;
      newMethods[index].sequence++;
      setMethods(newMethods);
    }
  };
  const handleMoveDown = (index) => {
    if (index < methods.length - 1) {
      const newMethods = [...methods];
      [newMethods[index], newMethods[index + 1]] = [
        newMethods[index + 1],
        newMethods[index],
      ];
      newMethods[index].sequence--;
      newMethods[index + 1].sequence++;
      setMethods(newMethods);
    }
  };

  return (
    <div className="space-y-4">
      {" "}
      <div className="flex justify-between items-center">
        {" "}
        <h2 className="text-xl font-semibold">Communication Methods</h2>{" "}
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
          {" "}
          <Plus className="h-4 w-4" /> <span>Add Method</span>{" "}
        </Button>{" "}
      </div>{" "}
      <div className="bg-white rounded-lg shadow">
        {" "}
        <table className="min-w-full">
          {" "}
          <thead>
            {" "}
            <tr className="border-b">
              {" "}
              <th className="px-6 py-3 text-left">Name</th>{" "}
              <th className="px-6 py-3 text-left">Description</th>{" "}
              <th className="px-6 py-3 text-center">Sequence</th>{" "}
              <th className="px-6 py-3 text-center">Mandatory</th>{" "}
              <th className="px-6 py-3 text-center">Actions</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {methods
              .sort((a, b) => a.sequence - b.sequence)
              .map((method, index) => (
                <tr key={method.id} className="border-b hover:bg-gray-50">
                  {" "}
                  <td className="px-6 py-4">{method.name}</td>{" "}
                  <td className="px-6 py-4">{method.description}</td>{" "}
                  <td className="px-6 py-4 text-center">{method.sequence}</td>{" "}
                  <td className="px-6 py-4 text-center">
                    {" "}
                    {method.mandatory ? "Yes" : "No"}{" "}
                  </td>{" "}
                  <td className="px-6 py-4 flex justify-center space-x-2">
                    {" "}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      {" "}
                      <ArrowUp className="h-4 w-4" />{" "}
                    </Button>{" "}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === methods.length - 1}
                    >
                      {" "}
                      <ArrowDown className="h-4 w-4" />{" "}
                    </Button>{" "}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMethod(method)}
                    >
                      {" "}
                      <Edit className="h-4 w-4" />{" "}
                    </Button>{" "}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(method.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      {" "}
                      <Trash className="h-4 w-4" />{" "}
                    </Button>{" "}
                  </td>{" "}
                </tr>
              ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      <CommunicationMethodFormModal
        isOpen={isAddModalOpen || !!editingMethod}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMethod(null);
        }}
        method={editingMethod}
        methods={methods}
        setMethods={setMethods}
      />{" "}
    </div>
  );
};

export default CommunicationMethodManagement; // EXPORT THE COMPONENT!!!!
