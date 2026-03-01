"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  User,
  Image as ImageIcon,
  LogOut,
  Award,
  ArrowLeft,
  Camera,
} from "lucide-react";

import ScrollCard from "../UI/ScrollCard";
import BrushDivider from "../UI/BrushDivider";
import BeltBadge from "../UI/BeltBadge";
import SealButton from "../UI/SealButton";
import { toast } from "sonner";

export default function StudentProfile({ student }) {
  const pathname = usePathname();
  const router = useRouter();

  const basePath = `/student/${student.userName}`;

  const menuItems = [
    { id: basePath, label: "Dashboard", icon: LayoutDashboard },
    { id: `${basePath}/exams`, label: "Upcoming Exams", icon: BookOpen },
    { id: `${basePath}/results`, label: "Exam Results", icon: Trophy },
    { id: `${basePath}/katasheet`, label: "Katasheet Upload", icon: ImageIcon },
    { id: `${basePath}/account`, label: "Account Details", icon: User },
  ];

  const onNavigate = (path) => {
    router.push(path);
  };
  const onLogout = () => {onNavigate('/')};

  const handleNavClick = (id) => {
    onNavigate(id);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    mobile: student.mobile,
    presentKyu: student.presentKyu,
    lastCertificateNum: student.lastCertificateNum,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const updatedStudent = {
      ...student,
      ...formData,
    };

    onUpdateProfile(updatedStudent);
    setIsEditing(false);

    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      presentKyu: student.presentKyu,
      lastCertificateNum: student.lastCertificateNum,
    });

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FEFBF5] border-r-2 border-[#1C1A17]/10 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#A61B1B] mb-1">
            Shubukan India
          </h2>
          <p className="text-sm text-[#5A5854]">Student Portal</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`sidebar-item w-full ${
                  pathname === item.id ? "active" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <BrushDivider />
          <button
            onClick={onLogout}
            className="sidebar-item w-full text-[#A61B1B] hover:bg-[#A61B1B]/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => onNavigate(basePath)}
            className="mb-6 flex items-center gap-2 text-[#1C1A17] hover:text-[#A61B1B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1C1A17] mb-2">
              My Profile
            </h1>
            <p className="text-[#5A5854]">
              Manage your personal information and credentials
            </p>
          </div>

          <ScrollCard className="p-8">
            {/* Avatar Section */}
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-[#1C1A17]/10">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#A61B1B] to-[#8A1616] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#C6A75E] rounded-full flex items-center justify-center shadow-lg hover:bg-[#B59750] transition-colors">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1C1A17] mb-3">
                  {student.name}
                </h2>

                <div className="mb-3">
                  <BeltBadge kyu={student.presentKyu} />
                </div>

                {student.isVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    ✔ Verified Student
                  </span>
                )}
              </div>

              <div>
                {!isEditing ? (
                  <SealButton onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </SealButton>
                ) : (
                  <div className="flex gap-2">
                    <SealButton onClick={handleSave}>Save Changes</SealButton>
                    <SealButton variant="secondary" onClick={handleCancel}>
                      Cancel
                    </SealButton>
                  </div>
                )}
              </div>
            </div>

            <BrushDivider />

            {/* Personal Info */}
            <div className="mt-8 mb-8">
              <h3 className="text-xl font-bold text-[#1C1A17] mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#A61B1B]" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["name", "email", "mobile"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-[#1C1A17] mb-2 block capitalize">
                      {field}
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={formData[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="ink-input w-full"
                      />
                    ) : (
                      <div className="p-3 bg-[#F5E9D8] rounded-lg">
                        {student[field]}
                      </div>
                    )}
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium text-[#1C1A17] mb-2 block">
                    Instructor
                  </label>
                  <div className="p-3 bg-[#E8DCC8] rounded-lg">
                    {student.instructorName}
                  </div>
                </div>
              </div>
            </div>

            <BrushDivider />

            {/* Training Credentials */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#1C1A17] mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C6A75E]" />
                Training Credentials
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#1C1A17] mb-2 block">
                    Present Kyu Level
                  </label>

                  {isEditing ? (
                    <select
                      value={formData.presentKyu}
                      onChange={(e) =>
                        handleChange("presentKyu", e.target.value)
                      }
                      className="ink-input w-full"
                    >
                      {[
                        "10th Kyu",
                        "9th Kyu",
                        "8th Kyu",
                        "7th Kyu",
                        "6th Kyu",
                        "5th Kyu",
                        "4th Kyu",
                        "3rd Kyu",
                        "2nd Kyu",
                        "1st Kyu",
                        "1st Dan",
                      ].map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F5E9D8] rounded-lg">
                      <BeltBadge kyu={student.presentKyu} />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1C1A17] mb-2 block">
                    Last Certificate Number
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.lastCertificateNum}
                      onChange={(e) =>
                        handleChange("lastCertificateNum", e.target.value)
                      }
                      className="ink-input w-full"
                    />
                  ) : (
                    <div className="p-3 bg-[#F5E9D8] rounded-lg font-mono">
                      {student.lastCertificateNum}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Student ID */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#A61B1B]/5 to-[#C6A75E]/5 rounded-lg border-2 border-[#A61B1B]/10">
              <p className="text-sm text-[#5A5854] mb-1">Student ID</p>
              <p className="text-2xl font-bold text-[#A61B1B] font-mono">
                89GH30LK
              </p>
            </div>
          </ScrollCard>
        </div>
      </main>
    </div>
  );
}
