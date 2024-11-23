export interface Servico {
    codigo: number;
    tituloServico: string;
    valorServico: number;
    descricaoServico: string;
    status: string;
    cliente: {
        codigo: number; // Inclua o código do cliente se necessário
        nome: string;
    };
}
