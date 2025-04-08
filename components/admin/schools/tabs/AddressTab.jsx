import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressTab({ editData, setEditData }) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          value={editData.address?.street || ""}
          onChange={(e) => setEditData({ ...editData, address: { ...editData.address, street: e.target.value } })}
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={editData.address?.city || ""}
          onChange={(e) => setEditData({ ...editData, address: { ...editData.address, city: e.target.value } })}
        />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={editData.address?.state || ""}
          onChange={(e) => setEditData({ ...editData, address: { ...editData.address, state: e.target.value } })}
        />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          value={editData.address?.postalCode || ""}
          onChange={(e) => setEditData({ ...editData, address: { ...editData.address, postalCode: e.target.value } })}
        />
      </div>
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="number"
          value={editData.address?.coordinates?.latitude || ""}
          onChange={(e) => setEditData({ ...editData, address: { ...editData.address, coordinates: { ...editData.address?.coordinates, latitude: Number(e.target.value) } } })}
        />
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          type="number"
          value={editData.address?.coordinates?.longitude || ""}
          onChange={(e) => setEditData({ ...editData, address: { ...editData.address, coordinates: { ...editData.address?.coordinates, longitude: Number(e.target.value) } } })}
        />
      </div>
    </div>
  );
}