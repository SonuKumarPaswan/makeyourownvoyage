"use client";

import React, { useState, useRef } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminUploadApi } from "@/lib/api/admin.api";

interface SingleImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
}

export function SingleImageUploader({
  label,
  value,
  onChange,
  folder = "makeyourownvoyage",
  required = false,
  helpText,
  placeholder = "https://images.unsplash.com/... or upload directly from device",
}: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const res = await adminUploadApi.uploadImage(file, folder);
      const uploadedUrl = res?.data?.url || res?.data?.secure_url || res?.url || res?.secure_url;
      if (uploadedUrl) {
        onChange(uploadedUrl);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload photo to Cloudinary");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-[11px] font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          <MaterialIcon name="image" size={16} className="text-[#d4af37]" />
          <span>{label} {required && <span className="text-red-400">*</span>}</span>
        </label>
        <label className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-slate-950 font-bold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 select-none">
          <MaterialIcon
            name={uploading ? "sync" : "cloud_upload"}
            size={16}
            className={uploading ? "animate-spin" : ""}
          />
          <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <MaterialIcon name="error_outline" size={16} />
          <span>{error}</span>
        </div>
      )}

      {value && (
        <div className="relative h-44 w-full rounded-lg overflow-hidden border border-gray-700 bg-gray-900 group">
          <img
            src={value}
            alt={label}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            <span className="bg-black/70 backdrop-blur-xs text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <MaterialIcon name="cloud_done" size={12} />
              <span>Preview</span>
            </span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-black/70 hover:bg-red-600/90 text-white text-[10px] p-1 rounded transition"
              title="Remove image"
            >
              <MaterialIcon name="close" size={14} />
            </button>
          </div>
        </div>
      )}

      <div>
        <span className="text-[10px] text-gray-400 block mb-1">
          Or paste direct CDN / Image Link:
        </span>
        <input
          type="url"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#0a1526] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
        />
        {helpText && (
          <p className="text-[10px] text-gray-400 mt-1">{helpText}</p>
        )}
      </div>
    </div>
  );
}

interface GalleryUploaderProps {
  label: string;
  urlsText: string;
  onChange: (urlsText: string) => void;
  folder?: string;
  helpText?: string;
}

export function GalleryUploader({
  label,
  urlsText,
  onChange,
  folder = "makeyourownvoyage",
  helpText = "Upload multiple high-resolution photos or paste URLs one per line.",
}: GalleryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const urls = urlsText
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      setError(null);
      const res = await adminUploadApi.uploadMultiple(files, folder);
      const newUrls: string[] = [];
      if (Array.isArray(res?.data)) {
        res.data.forEach((item: any) => {
          const url = item?.url || item?.secure_url;
          if (url) newUrls.push(url);
        });
      }

      if (newUrls.length > 0) {
        const updated = [...urls, ...newUrls].join("\n");
        onChange(updated);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload gallery photos");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = urls.filter((_, idx) => idx !== indexToRemove).join("\n");
    onChange(updated);
  };

  return (
    <div className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <label className="text-[11px] font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
            <MaterialIcon name="photo_library" size={16} className="text-[#d4af37]" />
            <span>{label}</span>
          </label>
          {helpText && <p className="text-[10px] text-gray-400 mt-0.5">{helpText}</p>}
        </div>
        <label className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer border border-gray-700 shadow select-none active:scale-95">
          <MaterialIcon
            name={uploading ? "sync" : "add_photo_alternate"}
            size={16}
            className={uploading ? "animate-spin text-[#d4af37]" : "text-[#d4af37]"}
          />
          <span>{uploading ? "Uploading..." : "+ Upload Photos"}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <MaterialIcon name="error_outline" size={16} />
          <span>{error}</span>
        </div>
      )}

      {urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
          {urls.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative group rounded-lg overflow-hidden h-24 border border-gray-700 bg-gray-900"
            >
              <img src={url} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 bg-black/80 hover:bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow"
                title="Remove photo"
              >
                <MaterialIcon name="close" size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <span className="text-[10px] text-gray-400 block mb-1">
          Gallery URLs (one URL per line):
        </span>
        <textarea
          rows={3}
          value={urlsText}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/... (one URL per line)"
          className="w-full bg-[#0a1526] border border-gray-700 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
        />
      </div>
    </div>
  );
}
