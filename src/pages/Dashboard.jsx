import React from "react";

export default function Dashboard() {
  // Product API response (for now static)
  const productInfo = {
    quota: 1000,
    used: 0,
    remaining: 1000,
    is_exceeded: false,
    usage_percentage: 0.0,
    can_create: true,
  };

  // Dummy user data (replace later)
  const user = {
    name: "Demo User",
    email: "demo@example.com",
    role: "Admin",
  };

  return (
    <div className="p-4 space-y-6">
      {/* User Info */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold mb-2">User Info</h2>
        <p className="text-sm text-gray-600">Name: {user.name}</p>
        <p className="text-sm text-gray-600">Email: {user.email}</p>
        <p className="text-sm text-gray-600">Role: {user.role}</p>
      </div>

      {/* Product Usage */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold mb-3">Product Usage</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Quota</p>
            <p className="font-medium">{productInfo.quota}</p>
          </div>

          <div>
            <p className="text-gray-500">Used</p>
            <p className="font-medium">{productInfo.used}</p>
          </div>

          <div>
            <p className="text-gray-500">Remaining</p>
            <p className="font-medium">{productInfo.remaining}</p>
          </div>

          <div>
            <p className="text-gray-500">Usage</p>
            <p className="font-medium">
              {productInfo.usage_percentage}%
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full"
              style={{ width: `${productInfo.usage_percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
