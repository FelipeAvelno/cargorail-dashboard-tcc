"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { TremLog1 } from "@/types/supabase";

export function useRealtimeTremLog1() {
    const [rows, setRows] = useState<TremLog1[]>([]);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            const { data, error } = await supabase
                .from("trem_log1")
                .select("*")
                .order("id", { ascending: true });

            if (!error && data && mounted) setRows(data as TremLog1[]);
        };

        load();

        const channel = supabase
            .channel("trem-log1-listener")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "trem_log1" },
                (payload) => {
                    const e = payload.eventType;
                    if (e === "INSERT") setRows((old) => [...old, payload.new as TremLog1]);
                    if (e === "UPDATE")
                        setRows((old) => old.map(r => (r.id === payload.new.id ? (payload.new as TremLog1) : r)));
                    if (e === "DELETE") setRows((old) => old.filter(r => r.id !== payload.old.id));
                }
            )
            .subscribe();

        return () => {
            mounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    // Derived stats memoized
    const stats = useMemo(() => {
        const total = rows.length;
        const ativos = rows.filter(r => r.ativo).length;
        const porFuncionario = Object.entries(
            rows.reduce((acc: Record<string, number>, cur) => {
                const key = cur.nome_funcionario ?? "Desconhecido";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {})
        ).map(([nome, valor]) => ({ nome, valor }));

        const tempoMedioMinutos = (() => {
            const tempos: number[] = [];
            for (const row of rows) {
                if (row.hora_inicio && row.hora_termino) {
                    const [hiH, hiM, hiS] = (row.hora_inicio).split(":").map(Number);
                    const [htH, htM, htS] = (row.hora_termino).split(":").map(Number);
                    const start = hiH * 3600 + hiM * 60 + hiS;
                    const end = htH * 3600 + htM * 60 + htS;
                    const diff = Math.max(0, end - start);
                    tempos.push(diff / 60);
                }
            }
            if (tempos.length === 0) return 0;
            const soma = tempos.reduce((a, b) => a + b, 0);
            return Math.round((soma / tempos.length) * 100) / 100;
        })();

        const porTrem = Object.entries(
            rows.reduce((acc: Record<string, number>, cur) => {
                const key = cur.numero_trem ? String(cur.numero_trem) : "N/A";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {})
        ).map(([nome, valor]) => ({ nome, valor }));

        const cargaMaisLevada = (() => {
            const counts = rows.reduce((acc: Record<string, number>, cur) => {
                const key = cur.tipo_carga || "N/A";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});
            let max = 0;
            let winner = "N/A";
            for (const [k, v] of Object.entries(counts)) {
                if (v > max) {
                    max = v;
                    winner = k;
                }
            }
            return winner;
        })();

        const tempoTotalHoras = (() => {
            let totalSeconds = 0;
            for (const row of rows) {
                if (row.hora_inicio && row.hora_termino) {
                    const [hiH, hiM, hiS] = (row.hora_inicio).split(":").map(Number);
                    const [htH, htM, htS] = (row.hora_termino).split(":").map(Number);
                    const start = hiH * 3600 + hiM * 60 + hiS;
                    const end = htH * 3600 + htM * 60 + htS;
                    totalSeconds += Math.max(0, end - start);
                }
            }
            return Math.round((totalSeconds / 3600) * 100) / 100;
        })();

        const horarioPico = (() => {
            const counts = rows.reduce((acc: Record<string, number>, cur) => {
                if (cur.hora_inicio) {
                    const hour = cur.hora_inicio.split(":")[0];
                    acc[hour] = (acc[hour] || 0) + 1;
                }
                return acc;
            }, {});
            let max = 0;
            let winner = "N/A";
            for (const [k, v] of Object.entries(counts)) {
                if (v > max) {
                    max = v;
                    winner = `${k}h`;
                }
            }
            return winner;
        })();

        return { total, ativos, porFuncionario, porTrem, tempoMedioMinutos, cargaMaisLevada, tempoTotalHoras, horarioPico };
    }, [rows]);

    return { rows, stats };
}