import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdmissionTab({ editData, setEditData }) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="admissionStatus">Admission Status</Label>
        <Select
          value={editData.admissionStatus || ""}
          onValueChange={(value) => setEditData({ ...editData, admissionStatus: value })}
        >
          <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent>
            {["Open", "Closed", "Upcoming"].map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="admissionProcess">Admission Process</Label>
        <Textarea
          id="admissionProcess"
          value={editData.admissionProcess || ""}
          onChange={(e) => setEditData({ ...editData, admissionProcess: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="establishedYear">Established Year</Label>
        <Input
          id="establishedYear"
          type="number"
          value={editData.establishedYear || ""}
          onChange={(e) => setEditData({ ...editData, establishedYear: Number(e.target.value) })}
        />
      </div>
    </div>
  );
}