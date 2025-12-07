"use client";
import React from "react";
import { Card } from "@/components/ui/Card";

import { motion } from "framer-motion";

export function KPICard({ title, value, subtitle, pulse = false }: { title: string; value: React.ReactNode; subtitle?: string; pulse?: boolean }) {
    return (
        <Card className="bg-neutral-800 text-white shadow-md">
            <div>
                <div className="text-sm text-zinc-300">{title}</div>
                <div className="text-3xl font-bold mt-2 flex items-center gap-2">
                    {pulse ? (
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {value}
                        </motion.span>
                    ) : (
                        value
                    )}
                    {pulse && (
                        <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </div>
                {subtitle && <div className="text-xs text-zinc-400 mt-1">{subtitle}</div>}
            </div>
        </Card>
    );
}
