"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const DeviceForm = () => {
  // Define state variables for device name and type
  const [device, setDevice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Create the onsubmit handler
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/devices/register", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ device_id: device }),
      });

      setLoading(false);

      // Check if response is ok
      if(!response.ok){
        const {error} = await response.json().catch(() => ({
          error: "Failed to register device",
        }));
        toast.error(error);
        return;
      }

      toast.success("Device registered successfully!");
      router.push("/dashboard");
    } catch (error){
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm border rounded-xl bg-white p-6 space-y-4">
      <h1 className="text-xl font-semibold">
        Register your Device
      </h1>
      <p className="text-sm text-gray-600">
        Please enter your device ID to register your device.
      </p>

      <div className="space-y-1">
        <label className="block text-sm">
          Device ID
        </label>
        <input className="w-full border rounded-md px-3 py-2 text-sm"
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        placeholder="abc-defghi"
        required
        />
      </div>

      <button type="submit" disabled={loading} 
      className="w-full rounded-md px-3 py-2 text-sm font-medium border bg-black text-white disabled:opacity-60">
        {loading ? "Saving..." : "Save and Continue"}
      </button>
    </form>
  )
}

export default DeviceForm;