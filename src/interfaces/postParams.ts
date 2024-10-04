export interface BC01 {
    horimetro: number
    pressao: number
    frequencia: number
    vazao: number
    volume: number

    nomePonto: string
    idColeta: number
}

export interface BC06 {
    pressao: number
    horimetro: number

    nomePonto: string
    idColeta: number
}

export interface BH02 {
    horimetro: number
    pressao: number
    frequencia: number

    nomePonto: string
    idColeta: number
}

export interface BS01_HIDROMETRO{
    volume: number

    nomePonto: string
    idColeta: number
}

export interface BS01_PRESSAO{
    pressao: number

    nomePonto: string
    idColeta: number
}

export interface BOMBA_BC03{
    pressao: number
    hidrometro: number
    horimetro: number

    nomePonto: string
    idColeta: number
}

export interface CD{
    tipo_rede: string
    pressao: number
    hidrometro: number

    nomePonto: string
    idColeta: number
}

export interface COLUNAS_CARVAO{
    pressao_c01: number
    pressao_c02: number
    pressao_c03: number
    pressao_saida: number
    houve_troca_carvao: boolean
    houve_retrolavagem: boolean

    nomePonto: string
    idColeta: number
}

export interface FASE_LIVRE{
    volume: number
    houve_troca: boolean

    nomePonto: string
    idColeta: number
}

export interface FILTRO_CARTUCHO{
    pressao_entrada: number
    pressao_saida: number

    nomePonto: string
    idColeta: number
}

export interface HORIMETRO{
    horimetro: number

    nomePonto: string
    idColeta: number
}

export interface PBS{
    pressao: number
    pulsos: number
    nivel_oleo: number
    nivel_agua: number
    vol_rem_oleo: number

    nomePonto: string
    idColeta: number
}

export interface PMPT{
    nivelAgua: number
    nivelOleo: number
    flRemoManual: number

    nomePonto: string
    idColeta: number
}

export interface SENSOR_PH{
    ph: number

    nomePonto: string
    idColeta: number
}

export interface TQ01{
    nivel: number

    nomePonto: string
    idColeta: number
}

export interface TQ02{
    sensor_ph: number
    Lt_02_1: number

    nomePonto: string
    idColeta: number
}

export interface TQ04_TQ05{
    houve_preparo_solucao: boolean
    qtd_bombonas: number
    kg_bombonas: number
    horimetro: number
    hidrometro: number

    nomePonto: string
    idColeta: number
}

export interface HIDROMETRO{
    volume: number

    nomePonto: string
    idColeta: number
}