import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function FacilitiesTab({ editData, setEditData }) {
  return (
    <div className="space-y-4 p-4">
      <Label>Facilities (comma-separated)</Label>
      <Textarea
        value={editData.facilities?.join(", ") || ""}
        onChange={(e) => setEditData({ ...editData, facilities: e.target.value.split(", ") })}
      />
    </div>
  );
}