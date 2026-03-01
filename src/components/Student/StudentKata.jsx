"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  User,
  Image as ImageIcon,
  LogOut,
  ArrowLeft,
  Upload,
  X,
  Camera,
} from "lucide-react";

import ScrollCard from "../UI/ScrollCard";
import BrushDivider from "../UI/BrushDivider";
import BeltBadge from "../UI/BeltBadge";
import SealButton from "../UI/SealButton";
import InkInput from "../UI/InkInput";
import Image from "next/image";

export default function StudentKata({
  student,
  studentId,
  existingImages = [],
  onUpload,
  onDelete,
}) {
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

  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!previewUrl || !caption) return;

    onUpload({
      studentId,
      imageUrl: previewUrl,
      caption,
    });

    setPreviewUrl("");
    setCaption("");
  };

  const getRotation = (index) => {
    const rotations = [-3, -2, -1, 0, 1, 2, 3];
    return rotations[index % rotations.length];
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
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1C1A17] mb-2">
              Kata Gallery
            </h1>
            <p className="text-[#5A5854]">
              Upload and manage your Katasheet images (Maximum 10 images)
            </p>
          </div>

          {/* Upload Section */}
          {existingImages.length < 10 && (
            <ScrollCard className="mb-8">
              <h3 className="text-xl font-bold text-[#1C1A17] mb-4">
                Upload New Image
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 cursor-pointer">
                    <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-[#1C1A17]/20 rounded-lg hover:border-[#C6A75E] transition-colors bg-[#F5E9D8]/50">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-[#C6A75E] mx-auto mb-2" />
                          <p className="text-sm text-[#5A5854]">
                            Click to select image
                          </p>
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <InkInput
                    label="Caption"
                    placeholder="e.g., Heian Shodan - Front Stance"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />

                  <SealButton
                    onClick={handleUpload}
                    disabled={!previewUrl || !caption}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </SealButton>

                  {previewUrl && (
                    <SealButton
                      variant="secondary"
                      onClick={() => {
                        setPreviewUrl("");
                        setCaption("");
                      }}
                      className="w-full"
                    >
                      Clear
                    </SealButton>
                  )}
                </div>
              </div>
            </ScrollCard>
          )}

          {/* Gallery */}
          <ScrollCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1C1A17]">
                Your Kata Images ({existingImages.length}/10)
              </h3>
            </div>

            {existingImages.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-[#C6A75E] mx-auto mb-4 opacity-50" />
                <p className="text-lg text-[#5A5854] mb-2">
                  No images uploaded yet
                </p>
                <p className="text-sm text-[#5A5854]">
                  Upload your kata practice images to track your progress
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {existingImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="kata-polaroid relative"
                    style={{
                      "--rotation": `${getRotation(index)}deg`,
                    }}
                  >
                    <div className="aspect-square overflow-hidden rounded-sm mb-3">
                      <img
                        src={image.imageUrl}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-sm text-[#1C1A17] text-center font-medium mb-2">
                      {image.caption}
                    </p>

                    <p className="text-xs text-[#5A5854] text-center">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>

                    <button
                      onClick={() => onDelete(image.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#A61B1B] text-white flex items-center justify-center hover:bg-[#8A1616] transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ScrollCard>
        </div>
      </main>
    </div>
  );
}
