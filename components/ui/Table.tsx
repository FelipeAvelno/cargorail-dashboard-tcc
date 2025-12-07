"use client";
import React, { useMemo, useState } from "react";
import { TremLog1 } from "@/types/supabase";
import { motion, AnimatePresence } from "framer-motion";

export function Table({ data, pageSize = 10 }: { data: TremLog1[]; pageSize?: number }) {
    const [page, setPage] = useState(0);
    const pages = Math.ceil(data.length / pageSize);

    const pageData = useMemo(() => data.slice(page * pageSize, page * pageSize + pageSize), [data, page, pageSize]);

    return (
        <div className="bg-neutral-800 rounded-2xl p-4 text-white">
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                    <thead>
                        <tr className="text-zinc-300">
                            <th className="p-2">ID</th>
                            <th>Nº</th>
                            <th>Carga</th>
                            <th>Funcionário</th>
                            <th>Data</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>Ativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="wait">
                            {pageData.map(r => (
                                <motion.tr
                                    key={r.id}
                                    className="border-t border-neutral-700"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <td className="p-2">{r.id}</td>
                                    <td className="p-2">{r.numero_trem}</td>
                                    <td className="p-2">{r.tipo_carga ?? '-'}</td>
                                    <td className="p-2">{r.nome_funcionario ?? '-'}</td>
                                    <td className="p-2">{r.data_operacao ?? '-'}</td>
                                    <td className="p-2">{r.hora_inicio ?? '-'}</td>
                                    <td className="p-2">{r.hora_termino ?? '-'}</td>
                                    <td className="p-2">{r.ativo ? '✔️' : '❌'}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-zinc-300">
                <div>Pagina {page + 1} de {pages}</div>
                <div className="space-x-2">
                    <button onClick={() => setPage(p => Math.max(0, p - 1))} className="px-3 py-1 rounded bg-neutral-700">Prev</button>
                    <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} className="px-3 py-1 rounded bg-neutral-700">Next</button>
                </div>
            </div>
        </div>
    );
}
