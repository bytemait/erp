"use client";
import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
// import Image from "next/image";

const initialProfileFields = [
  { key: "enrollmentNo", label: "Enrollment No", value: "-" },
  { key: "name", label: "Name", value: "-" },
  { key: "email", label: "Email", value: "-" },
  { key: "dob", label: "Date of Birth", value: "-" },
  { key: "fullAddress", label: "Full Address", value: "-" },
  { key: "mobile", label: "Mobile Number", value: "-" },
  { key: "gender", label: "Gender", value: "-" },
  { key: "category", label: "Category", value: "-" },
  { key: "region", label: "Region", value: "-" },
  { key: "fatherName", label: "Father's Name", value: "-" },
  { key: "motherName", label: "Mother's Name", value: "-" },
  { key: "fatherQualification", label: "Father's Qualification", value: "-" },
  { key: "motherQualification", label: "Mother's Qualification", value: "-" },
  { key: "fatherOccupation", label: "Father's Occupation", value: "-" },
  { key: "motherOccupation", label: "Mother's Occupation", value: "-" },
  { key: "fatherJobDesignation", label: "Father's Job Designation", value: "-" },
  { key: "motherJobDesignation", label: "Mother's Job Designation", value: "-" },
  { key: "fatherBusinessType", label: "Father's Business Type", value: "-" },
  { key: "motherBusinessType", label: "Mother's Business Type", value: "-" },
  { key: "fatherMobile", label: "Father's Mobile", value: "-" },
  { key: "motherMobile", label: "Mother's Mobile", value: "-" },
  { key: "fatherOfficeAddress", label: "Father's Office Address", value: "-" },
  { key: "motherOfficeAddress", label: "Mother's Office Address", value: "-" },
  { key: "guardianName", label: "Guardian Name", value: "-" },
  { key: "board12th", label: "12th Board", value: "-" },
  { key: "yearOf12th", label: "Year of 12th", value: "-" },
  { key: "rollno12th", label: "12th Roll Number", value: "-" },
  { key: "school12th", label: "12th School Name", value: "-" },
  { key: "aggregate12th", label: "12th Aggregate (%)", value: "-" },
  { key: "board10th", label: "10th Board", value: "-" },
  { key: "yearOf10th", label: "Year of 10th", value: "-" },
  { key: "rollno10th", label: "10th Roll Number", value: "-" },
  { key: "school10th", label: "10th School Name", value: "-" },
  { key: "aggregate10th", label: "10th Aggregate (%)", value: "-" },
  { key: "jeeRank", label: "JEE Rank", value: "-" },
  { key: "jeePercentile", label: "JEE Percentile", value: "-" },
  { key: "jeeRollno", label: "JEE Roll Number", value: "-" },
  { key: "specialAchievements", label: "Special Achievements", value: "-" },
  { key: "passportPhotograph", label: "Passport Photograph", value: "-" },
  { key: "marksheet10th", label: "10th Marksheet", value: "-" },
  { key: "marksheet12th", label: "12th Marksheet", value: "-" },
  { key: "aadhar", label: "Aadhar Card", value: "-" },
  { key: "pancard", label: "PAN Card", value: "-" },
];

const ProfilePage = () => {
  const [profileFields, setProfileFields] = useState(initialProfileFields);
  const [isEditing, setIsEditing] = useState(false);
  // const params = useParams();
  // const id = params.id;

  const id = useAppSelector((state) => state.user.id);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`/api/student/profile/${id}`, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.data.success && response.data.data) {
          setProfileFields(prevFields =>
            prevFields.map(field => ({
              ...field,
              value: response.data.data[field.key] ||
                response.data.data.details?.[field.key] ||
                field.value,
            }))
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("API Error:", error.response?.data || error.message);
        }
      }
    };

    fetchProfileData();
  }, [id]);

  const handleChange = (key: string, newValue: string) => {
    setProfileFields((prevFields) =>
      prevFields.map((field) =>
        field.key === key ? { ...field, value: newValue } : field
      )
    );
  };

  const handleSave = async () => {
    try {
      const updatedData: { details: Record<string, string> } = {
        // student: {}, 
        details: {}
      };

      profileFields.forEach(field => {
        let value = field.value.trim();
        value = value === "" ? "-" : String(value);

        // if (["enrollmentNo", "name", "email", "isLateralEntry", "isAlumni"].includes(field.key)) {
        //   updatedData.student[field.key] = value;
        // } else {
        //   updatedData.details[field.key] = value;
        // }

        updatedData.details[field.key] = value;
      });


      console.log("Sending Data:", updatedData);

      const response = await fetch(`/api/student/profile/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      console.log("Response from API:", result);

      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6 border-2 border-gray-300 rounded-lg shadow-lg w-full mx-auto">
      {/* Profile Header */}
      <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
        {/* <Image
          src='/images/profile.jpg'
          alt="Profile"
          width={140}
          height={140}
          className="rounded-full border-2 shadow-md"
        /> */}

        <div>
          <div>
            <h2 className="text-xl font-bold">Full Name</h2>
            <p className="text-lg">
              {profileFields.find((field) => field.key === "name")?.value}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Enrollment Number</h2>
            <p className="text-lg">
              {profileFields.find((field) => field.key === "enrollmentNo")?.value}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Email</h2>
            <p className="text-lg">
              {profileFields.find((field) => field.key === "email")?.value}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-4">
        {profileFields
          .filter((field) => !["enrollmentNo", "name", "email"].includes(field.key))
          .map((field) => (
            <div key={field.key} className="flex flex-col">
              <label className="font-semibold">{field.label}:</label>

              {isEditing ? (
                field.key === "gender" ? (
                  <select
                    className="border p-2 rounded bg-white"
                    value={field.value !== "-" ? field.value : ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                ) : field.key === "category" ? (
                  <select
                    className="border p-2 rounded bg-white"
                    value={field.value !== "-" ? field.value : ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                    <option value="GEN">GEN</option>
                    <option value="EWS">EWS</option>
                    <option value="PH">PH</option>
                    <option value="DEFENCE">DEFENCE</option>
                    <option value="J_AND_K_MIGRANT">J AND K MIGRANT</option>
                  </select>
                ) : field.key === "region" ? (
                  <select
                    className="border p-2 rounded bg-white"
                    value={field.value !== "-" ? field.value : ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">Select Region</option>
                    <option value="DELHI">DELHI</option>
                    <option value="OUTSIDE_DELHI">OUTSIDE DELHI</option>
                  </select>
                ) : (
                  <Input
                    value={field.value !== "-" ? field.value : ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )
              ) : (
                <span>{field.value !== "-" ? field.value : "Not provided"}</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;