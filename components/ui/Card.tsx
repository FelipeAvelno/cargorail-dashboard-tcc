"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`p-4 rounded-2xl ${className}`}
        >
            {children}
        </motion.div>
    );
}

export function CardHeader({ children }: { children: ReactNode }) {
    return <div className="mb-2 text-sm text-zinc-400">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
    return <div className="text-lg font-semibold">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
    return <div className="mt-3">{children}</div>;
}
