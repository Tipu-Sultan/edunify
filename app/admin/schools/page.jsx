// app/admin/schools/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SchoolList from "@/components/admin/schools/SchoolList";
import SchoolEditModal from "@/components/admin/schools/SchoolEditModal";


export default function SchoolsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.userType !== "SCHOOLADMIN") {
        router.push("/unauthorized");
        return;
      }

      fetch(`/api/admin/schools?createdBy=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setSchools(data))
        .catch((err) => console.error("Error fetching schools:", err));
    }
  }, [status, session, router]);

  const filteredSchools = schools?.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (school) => setSelectedSchool(school);
  const handleCloseModal = () => setSelectedSchool(null);

  const handleSave = async (updatedData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/schools/${selectedSchool.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedSchool = await response.json();
        setSchools(
          schools.map((s) => (s.slug === updatedSchool.slug ? updatedSchool : s))
        );
      setIsLoading(false);
        
      } else {
      setIsLoading(false);
        console.error("Failed to update school");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error saving school:", error);
    }
  };

  const handleDelete = async (slug) => {
    if (confirm("Are you sure you want to delete this school?")) {
      try {
        await fetch(`/api/admin/schools/${slug}`, { method: "DELETE" });
        setSchools(schools.filter((s) => s.slug !== slug));
      } catch (error) {
        console.error("Error deleting school:", error);
      }
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <SchoolList
        schools={filteredSchools}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {selectedSchool && (
        <SchoolEditModal
        isLoading={isLoading}
          school={selectedSchool}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}