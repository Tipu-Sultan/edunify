import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function FeesTab({ editData, setEditData }) {
  const [otherFees, setOtherFees] = useState(editData.fees?.otherFees || []);

  const handleAddFee = () => {
    const newFee = { name: "", amount: 0 };
    const updatedFees = [...otherFees, newFee];
    setOtherFees(updatedFees);
    setEditData({ ...editData, fees: { ...editData.fees, otherFees: updatedFees } });
  };

  const handleRemoveFee = (index) => {
    const updatedFees = otherFees.filter((_, i) => i !== index);
    setOtherFees(updatedFees);
    setEditData({ ...editData, fees: { ...editData.fees, otherFees: updatedFees } });
  };

  const handleFeeChange = (index, field, value) => {
    const updatedFees = otherFees.map((fee, i) =>
      i === index ? { ...fee, [field]: field === "amount" ? Number(value) : value } : fee
    );
    setOtherFees(updatedFees);
    setEditData({ ...editData, fees: { ...editData.fees, otherFees: updatedFees } });
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="annualFee">Annual Fee</Label>
        <Input
          id="annualFee"
          type="number"
          value={editData.fees?.annualFee || ""}
          onChange={(e) =>
            setEditData({ ...editData, fees: { ...editData.fees, annualFee: Number(e.target.value) } })
          }
          placeholder="Enter annual fee"
        />
      </div>
      <div>
        <Label htmlFor="admissionFee">Admission Fee</Label>
        <Input
          id="admissionFee"
          type="number"
          value={editData.fees?.admissionFee || ""}
          onChange={(e) =>
            setEditData({ ...editData, fees: { ...editData.fees, admissionFee: Number(e.target.value) } })
          }
          placeholder="Enter admission fee"
        />
      </div>
      <div className="space-y-2">
        <Label>Other Fees</Label>
        {otherFees.map((fee, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 border p-4 rounded-md relative">
            <div className="flex-1">
              <Label htmlFor={`fee-name-${index}`}>Fee Name</Label>
              <Input
                id={`fee-name-${index}`}
                value={fee.name || ""}
                onChange={(e) => handleFeeChange(index, "name", e.target.value)}
                placeholder="Fee Name (e.g., Transport)"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor={`fee-amount-${index}`}>Amount</Label>
              <Input
                id={`fee-amount-${index}`}
                type="number"
                value={fee.amount || ""}
                onChange={(e) => handleFeeChange(index, "amount", e.target.value)}
                placeholder="Amount"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => handleRemoveFee(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddFee} className="mt-2">
          Add Other Fee
        </Button>
      </div>
    </div>
  );
}