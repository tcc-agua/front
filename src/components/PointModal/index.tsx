import Bc01Card from "./cards/Bc01Card";
import Bc06Card from "./cards/Bc06Card";
import Bh02Card from "./cards/Bh02Card";
import BombaBc03Card from "./cards/BombaBc03Card";
import Bs01HidrometroCard from "./cards/Bs01HidrometroCard";
import Bs01PressaoCard from "./cards/Bs01PressaoCard";
import CdCard from "./cards/CdCard";
import ColunasCarvaoCard from "./cards/ColunasCarvaoCard";
import FaseLivreCard from "./cards/FaseLivreCard";
import FiltroCartuchoCard from "./cards/FiltroCartuchoCard";
import PbsCard from "./cards/PbsCard";
import ModalContainer from "./ModalContainer";

export const PointModal = {
    Container: ModalContainer,
    
    BC01: Bc01Card,
    BC06: Bc06Card,
    BH02: Bh02Card,
    BOMBA_BC03: BombaBc03Card,
    BS01_HIDROMETRO: Bs01HidrometroCard,
    BS01_PRESSAO: Bs01PressaoCard,
    CD: CdCard,
    COLUNAS_CARVAO: ColunasCarvaoCard,
    FASE_LIVRE: FaseLivreCard,
    FILTRO_CARTUCHO: FiltroCartuchoCard,
    PBS: PbsCard
}