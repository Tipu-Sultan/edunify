import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function FacultyTab({ editData, setEditData }) {
  const [facultyList, setFacultyList] = useState(editData.faculty || []);

  const handleAddFaculty = () => {
    const newFaculty = { name: "", subject: "", qualification: "", experience: "" };
    const updatedList = [...facultyList, newFaculty];
    setFacultyList(updatedList);
    setEditData({ ...editData, faculty: updatedList });
  };

  const handleRemoveFaculty = (index) => {
    const updatedList = facultyList.filter((_, i) => i !== index);
    setFacultyList(updatedList);
    setEditData({ ...editData, faculty: updatedList });
  };

  const handleFacultyChange = (index, field, value) => {
    const updatedList = facultyList.map((faculty, i) =>
      i === index ? { ...faculty, [field]: value } : faculty
    );
    setFacultyList(updatedList);
    setEditData({ ...editData, faculty: updatedList });
  };

  return (
    <div className="space-y-4 p-4">
      <Label>Faculty</Label>
      {facultyList.map((faculty, index) => (
        <div key={index} className="space-y-2 border p-4 rounded-md relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`name-${index}`}>Name</Label>
              <Input
                id={`name-${index}`}
                value={faculty.name || ""}
                onChange={(e) => handleFacultyChange(index, "name", e.target.value)}
                placeholder="Faculty Name"
              />
            </div>
            <div>
              <Label htmlFor={`subject-${index}`}>Subject</Label>
              <Input
                id={`subject-${index}`}
                value={faculty.subject || ""}
                onChange={(e) => handleFacultyChange(index, "subject", e.target.value)}
                placeholder="Subject"
              />
            </div>
            <div>
              <Label htmlFor={`qualification-${index}`}>Qualification</Label>
              <Input
                id={`qualification-${index}`}
                value={faculty.qualification || ""}
                onChange={(e) => handleFacultyChange(index, "qualification", e.target.value)}
                placeholder="Qualification"
              />
            </div>
            <div>
              <Label htmlFor={`experience-${index}`}>Experience</Label>
              <Input
                id={`experience-${index}`}
                value={faculty.experience || ""}
                onChange={(e) => handleFacultyChange(index, "experience", e.target.value)}
                placeholder="Experience"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-red-500"
            onClick={() => handleRemoveFaculty(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={handleAddFaculty} className="mt-2">
        Add Faculty
      </Button>
    </div>
  );
}