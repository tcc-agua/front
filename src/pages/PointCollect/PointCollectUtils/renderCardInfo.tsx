import { PointModal } from "../../../components/PointModal"
import { Point } from "../PointNames"

// UTILS

export function renderCardInfo(name: string, idColeta: number) {

    if (name.startsWith("PM") || name.startsWith("PT")) {
        return <PointModal.PMPT
            name={name}
            idColeta={idColeta}
        />
    }
    if (name.startsWith("PB")) {
        return <PointModal.PBS
            name={name}
            idColeta={idColeta}
        />
    }
    if (name.startsWith("CD")) {
        return <PointModal.CD
            name={name}
            idColeta={idColeta}
        />
    }
    if (name == "TQ04" || name == "TQ05") {
        return <PointModal.TQ04_TQ05
            name={name}
            idColeta={idColeta}
        />
    }
    if (name.startsWith("AG") || name == "BS01 HORIMETRO") {
        return <PointModal.HORIMETRO
            name={name}
            idColeta={idColeta}
        />
    }
    if (name.startsWith("Geral") ||
        name.startsWith("Entrada") ||
        name.startsWith("Saida") ||
        name == "Refeitorio" ||
        name.startsWith("Kinderhaus") ||
        name.startsWith("Descarte") ||
        name.startsWith("Agua") ||
        name.startsWith("Central") ||
        name.startsWith("Caixa") ||
        name.startsWith("ETAS") ||
        name.startsWith("Tanque")) {

        return <PointModal.HIDROMETRO
        name={name}
        idColeta={idColeta}
        />
    }

    switch (name) {
        case "BC01":
                return <PointModal.BC01
                name={name}
                idColeta={idColeta}
            />
        case "BC06":
            return <PointModal.BC06
                name={name}
                idColeta={idColeta}
            />

        case "BH02":
            return <PointModal.BH02
                name={name}
                idColeta={idColeta}
            />

        case "BOMBA BC03":
            return <PointModal.BOMBA_BC03
                name={name}
                idColeta={idColeta}
            />

        case "BS01 HIDROMETRO":
            return <PointModal.BS01_HIDROMETRO
                name={name}
                idColeta={idColeta}
            />

        case "BS01 PRESSAO":
            return <PointModal.BS01_PRESSAO
                name={name}
                idColeta={idColeta}
            />

        case "COLUNAS CARVAO":
            return <PointModal.COLUNAS_CARVAO
                name={name}
                idColeta={idColeta}
            />

        case "FASE LIVRE":
            return <PointModal.FASE_LIVRE
                name={name}
                idColeta={idColeta}
            />

        case "FILTRO CARTUCHO":
            return <PointModal.FILTRO_CARTUCHO
                name={name}
                idColeta={idColeta}
            />

        case "HORIMETRO":
            return <PointModal.HORIMETRO
                name={name}
                idColeta={idColeta}
            />

        case "SENSOR PH":
            return <PointModal.SENSOR_PH
                name={name}
                idColeta={idColeta}
            />

        case "TQ01":
            return <PointModal.TQ01
                name={name}
                idColeta={idColeta}
            />

        case "TQ02":
            return <PointModal.TQ02
                name={name}
                idColeta={idColeta}
            />

        case "TQ04 TQ05":
            return <PointModal.TQ04_TQ05
                name={name}
                idColeta={idColeta}
            />
    }
}

// CALCULAR PORCENTAGEM

export function calculatePercentageCollected(points: Point[]): string {
    if (points.length === 0) return "0%";
  
    const collectedPoints = points.filter((point) => point.statusEnum === "COLETADO");
    const percentage = (collectedPoints.length / points.length) * 100;
  
    return `${percentage.toFixed(0)}%`;
  }

// Buscar nome da planilha

export function getPlanilhaTitle(planilha: string | null) {

    switch (planilha) {
        case "DADOS ETAS":
            return "Estações de Tratamento de Águas Subterrâneas";
        case "PBS":
            return "Poços de Bombeamento";
        case "NA":
            return "Nível de Água";
        case "CA":
            return "Consumo de Água";
        default:
            return "Planilha não encontrada!";
    }
}
