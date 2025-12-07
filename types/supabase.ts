export type TremLog1 = {
    id: number;
    numero_trem: number;
    tipo_carga: string | null;
    nome_funcionario: string | null;
    codigo_funcionario: number;
    data_operacao: string | null; // "YYYY-MM-DD"
    hora_inicio: string | null;   // "HH:MM:SS"
    hora_termino: string | null;  // "HH:MM:SS"
    ativo: boolean;
};