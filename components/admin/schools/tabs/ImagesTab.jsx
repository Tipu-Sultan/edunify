import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ImagesTab({ editData, setEditData }) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label>Images (comma-separated URLs)</Label>
        <Textarea
          value={editData.images?.join(", ") || ""}
          onChange={(e) => setEditData({ ...editData, images: e.target.value.split(", ") })}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {editData.images?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`School ${index}`}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}