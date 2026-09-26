"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminUsersApi } from "@/lib/api/admin.api";

interface UserItem {
  _id: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: "admin" | "agent" | "user" | string;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);
  const [newRole, setNewRole] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminUsersApi.getAll();
      if (Array.isArray(res)) {
        setUsers(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenEdit = (user: UserItem) => {
    setCurrentUser(user);
    setNewRole(user.role || "user");
    setIsModalOpen(true);
  };

  const handleSubmitRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);

    try {
      await adminUsersApi.update(currentUser._id, { role: newRole });
      showToast("success", `Updated user role to ${newRole}.`);
      setUsers((prev) =>
        prev.map((u) => (u._id === currentUser._id ? { ...u, role: newRole } : u))
      );
      setIsModalOpen(false);
    } catch (err: any) {
      showToast("error", err.message || "Failed to update role. Check admin token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = users.filter((u) => {
    const name = (u.name || u.fullName || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = name.includes(query) || email.includes(query);
    const matchesRole = selectedRole === "all" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-xs font-semibold shadow-2xl flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          <MaterialIcon
            name={notification.type === "success" ? "check_circle" : "error"}
            size={18}
          />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Users &amp; Team Directory
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage registered accounts, assigned travel agents, and administrator privileges.
          </p>
        </div>

        <button
          onClick={loadData}
          className="px-3.5 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white border border-gray-700 text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <MaterialIcon name="refresh" size={16} />
          <span>Refresh Directory</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-[#0a1526] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <MaterialIcon
            name="search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-[#070e17] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-[#070e17] border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="agent">Travel Agents</option>
            <option value="user">Customers</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Joined</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Loading users directory...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No users found matching search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-3.5">
                      <div className="font-semibold text-white">
                        {u.name || u.fullName || "User Account"}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">{u._id}</div>
                    </td>
                    <td className="p-3.5">
                      <div>{u.email || "-"}</div>
                      <div className="text-[11px] text-gray-400">{u.phone || "-"}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          u.role === "admin"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : u.role === "agent"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-gray-800 text-gray-300 border border-gray-700"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-400">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-[11px] font-medium"
                      >
                        Manage Role
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MaterialIcon name="manage_accounts" size={20} className="text-[#d4af37]" />
                <span>Modify User Role</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <div className="text-xs text-gray-300 space-y-1">
              <div>
                <span className="text-gray-500">User:</span>{" "}
                <strong className="text-white">
                  {currentUser.name || currentUser.fullName}
                </strong>
              </div>
              <div>
                <span className="text-gray-500">Email:</span> {currentUser.email}
              </div>
            </div>

            <form onSubmit={handleSubmitRole} className="space-y-4 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                  Assigned Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                >
                  <option value="user">Customer (Standard User)</option>
                  <option value="agent">Travel Agent (CRM Operator)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#d4af37] text-black hover:bg-[#c49f27] transition flex items-center gap-1.5"
                >
                  {isSubmitting ? "Saving..." : "Update Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
