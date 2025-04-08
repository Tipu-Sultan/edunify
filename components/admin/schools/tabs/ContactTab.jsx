import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContactTab = ({ editData, setEditData }) => {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={editData.contact?.phone || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              contact: {
                ...editData.contact,
                phone: e.target.value,
              },
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={editData.contact?.email || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              contact: {
                ...editData.contact,
                email: e.target.value,
              },
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={editData.contact?.website || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              contact: {
                ...editData.contact,
                website: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default ContactTab;