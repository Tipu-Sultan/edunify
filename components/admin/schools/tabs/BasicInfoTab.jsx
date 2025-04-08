import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BasicInfoTab({ editData, setEditData }) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={editData.name || ""}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editData.description || ""}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="board">Board</Label>
        <Select
          value={editData.board || ""}
          onValueChange={(value) => setEditData({ ...editData, board: value })}
        >
          <SelectTrigger><SelectValue placeholder="Select board" /></SelectTrigger>
          <SelectContent>
            {["CBSE", "ICSE", "IB", "State", "Other"].map((board) => (
              <SelectItem key={board} value={board}>{board}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="medium">Medium (comma-separated)</Label>
        <Input
          id="medium"
          value={editData.medium?.join(", ") || ""}
          onChange={(e) => setEditData({ ...editData, medium: e.target.value.split(", ") })}
        />
      </div>
      <div>
        <Label htmlFor="schoolType">School Type</Label>
        <Select
          value={editData.schoolType || ""}
          onValueChange={(value) => setEditData({ ...editData, schoolType: value })}
        >
          <SelectTrigger><SelectValue placeholder="Select school type" /></SelectTrigger>
          <SelectContent>
            {["Public", "Private", "International", "Boarding", "Day"].map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={editData.gender || ""}
          onValueChange={(value) => setEditData({ ...editData, gender: value })}
        >
          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
          <SelectContent>
            {["Co-ed", "Boys", "Girls"].map((gender) => (
              <SelectItem key={gender} value={gender}>{gender}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}