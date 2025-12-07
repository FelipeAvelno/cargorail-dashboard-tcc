"use client";


import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { useRealtimeTremLog1 } from "@/hooks/useRealtimeTremLog1";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { rows, stats } = useRealtimeTremLog1();

    const pieData = stats.porFuncionario.slice(0, 8).map((f) => ({ name: f.nome, value: f.valor }));
    const pieDataTrem = stats.porTrem.slice(0, 8).map((t) => ({ name: `Trem ${t.nome}`, value: t.valor }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A78BFA", "#F472B6", "#60A5FA", "#34D399"];

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-6">
            <main className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-2xl font-bold mb-4">Dashboard Realtime</h1>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                        <KPICard title="Total Operações" value={stats.total} subtitle="Total acumulado" />
                        <KPICard title="Operações Ativas" value={stats.ativos} subtitle="Registros com ativo = true" pulse={true} />
                        <KPICard title="Tempo médio (min)" value={stats.tempoMedioMinutos} subtitle="Média entre início e término" />
                        <KPICard title="Carga Mais Levada" value={stats.cargaMaisLevada} subtitle="Tipo mais frequente" />
                        <KPICard title="Tempo Total (h)" value={stats.tempoTotalHoras} subtitle="Soma das durações" />
                        <KPICard title="Horário de Pico" value={stats.horarioPico} subtitle="Hora com mais inícios" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="col-span-2 bg-neutral-800">
                            <div className="mb-3 text-zinc-300">Distribuição por Trem</div>
                            <div style={{ width: '100%', height: 300 }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="w-full h-full"
                                >
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={pieDataTrem}
                                                dataKey="value"
                                                nameKey="name"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                isAnimationActive={true}
                                                animationDuration={1500}
                                            >
                                                {pieDataTrem.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value} usos`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </motion.div>
                            </div>
                        </Card>

                        <Card className="bg-neutral-800">
                            <div className="mb-3 text-zinc-300">Distribuição por funcionário</div>
                            <div style={{ width: '100%', height: 300 }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="w-full h-full"
                                >
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                isAnimationActive={true}
                                                animationDuration={1500}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value} usos`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </motion.div>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <Table data={rows} pageSize={12} />
                    </div>
                </motion.div>
            </main>
        </div>
    );
}