"use client";

import React, { useState, useEffect } from 'react';

export default function MaintenanceScreen() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX - innerWidth / 2) / 25; // Adjust divisor for sensitivity
            const y = (e.clientY - innerHeight / 2) / 25;
            setOffset({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900 overflow-hidden relative">
            {/* Background Pattern/Grid for depth reference */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    transform: `translate(${offset.x * -0.5}px, ${offset.y * -0.5}px)` // Parallax background
                }}
            />

            <div
                className="relative z-10 p-12 rounded-3xl bg-neutral-800 text-center transition-shadow duration-75 ease-out"
                style={{
                    boxShadow: `
            ${-offset.x}px ${-offset.y}px 30px rgba(255, 255, 255, 0.05), 
            ${offset.x}px ${offset.y}px 30px rgba(0, 0, 0, 0.5),
            inset ${offset.x}px ${offset.y}px 30px rgba(255, 255, 255, 0.02),
            inset ${-offset.x}px ${-offset.y}px 30px rgba(0, 0, 0, 0.2)
          `,
                    transform: `perspective(1000px) rotateX(${-offset.y * 0.1}deg) rotateY(${offset.x * 0.1}deg)`
                }}
            >
                <h1 className="text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
                    Em Manutenção
                </h1>
                <p className="text-neutral-400 text-lg max-w-md mx-auto">
                    Estamos fazendo melhorias no sistema. Voltaremos em breve com novidades.
                </p>

                <div className="mt-8">
                    <div className="w-16 h-16 border-4 border-neutral-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        </div>
    );
}
