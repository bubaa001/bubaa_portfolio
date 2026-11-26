import type { Metadata } from "next";
import Dashboard from "./Dashboard";
export const metadata: Metadata = { title: "Admin dashboard demo" };
export default function Page() { return <Dashboard />; }
