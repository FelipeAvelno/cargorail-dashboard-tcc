"use client";
import React from "react";

export function Sidebar() {
    return (
        <aside className="w-64 p-4 bg-neutral-900 text-white min-h-screen">
            <h2 className="text-xl font-bold mb-6">Admin</h2>
            <nav className="space-y-2 text-sm">
                <a className="block p-2 rounded hover:bg-neutral-800">Dashboard</a>
                <a className="block p-2 rounded hover:bg-neutral-800">Logs</a>
                <a className="block p-2 rounded hover:bg-neutral-800">Config</a>
            </nav>
        </aside>
    );
}
