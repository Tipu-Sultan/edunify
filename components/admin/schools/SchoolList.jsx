// components/admin/schools/SchoolList.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SchoolList({ schools, searchTerm, setSearchTerm, onEdit, onDelete }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Schools Management</h1>
        <Input
          placeholder="Search schools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schools?.map((school) => (
          <Card key={school._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg">
                <span className="truncate">{school.name}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(school)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(school.slug)}
                  >
                    Delete
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>Board</Label>
                  <p>{school.board}</p>
                </div>
                <div>
                  <Label>Fee</Label>
                  <p>₹{school.fees.annualFee}/year</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p>{school.address.city}, {school.address.state}</p>
                </div>
                <div>
                  <Label>Medium</Label>
                  <p>{school.medium.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}