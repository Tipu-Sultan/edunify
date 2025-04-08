// components/admin/schools/SchoolEditModal.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoTab from "./tabs/BasicInfoTab";
import AddressTab from "./tabs/AddressTab";
import ImagesTab from "./tabs/ImagesTab";
import FeesTab from "./tabs/FeesTab";
import FacilitiesTab from "./tabs/FacilitiesTab";
import FacultyTab from "./tabs/FacultyTab";
import AdmissionTab from "./tabs/AdmissionTab";
import ContactTab from "./tabs/ContactTab";

export default function SchoolEditModal({ isLoading,school, onSave, onClose }) {
  const [editData, setEditData] = useState({ ...school });

  const handleSaveClick = () => onSave(editData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <CardTitle>Edit School: {school.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="flex flex-wrap gap-2 justify-start">
              <TabsTrigger value="basic" className="flex-1 min-w-[100px]">Basic Info</TabsTrigger>
              <TabsTrigger value="address" className="flex-1 min-w-[100px]">Address</TabsTrigger>
              <TabsTrigger value="images" className="flex-1 min-w-[100px]">Images</TabsTrigger>
              <TabsTrigger value="contact" className="flex-1 min-w-[100px]">Contact</TabsTrigger>
              <TabsTrigger value="fees" className="flex-1 min-w-[100px]">Fees</TabsTrigger>
              <TabsTrigger value="facilities" className="flex-1 min-w-[100px]">Facilities</TabsTrigger>
              <TabsTrigger value="faculty" className="flex-1 min-w-[100px]">Faculty</TabsTrigger>
              <TabsTrigger value="admission" className="flex-1 min-w-[100px]">Admission</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfoTab editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="address">
              <AddressTab editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="images">
              <ImagesTab  editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="contact">
              <ContactTab editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="fees">
              <FeesTab editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="facilities">
              <FacilitiesTab editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="faculty">
              <FacultyTab editData={editData} setEditData={setEditData} />
            </TabsContent>
            <TabsContent value="admission">
              <AdmissionTab editData={editData} setEditData={setEditData} />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex gap-4 justify-end">
            <Button onClick={handleSaveClick} disabled={isLoading}>{isLoading ?'Saving...':'Save Changes'}</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}