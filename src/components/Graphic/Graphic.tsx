import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

export interface ChartDataProp {
    meses: string[];
    nome: string;
    volumes: number[];
}

interface GraphicProps {
    chartDataProp?: ChartDataProp;
}

const Graphic = ({ chartDataProp }: GraphicProps) => {
    const options: ApexOptions = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: chartDataProp ? chartDataProp.meses : [],
            labels: {
                style: {
                    colors: 'var(--font_color)',  // Cor dos meses (eixo X)
                    fontSize: '12px', // Adicione o tamanho da fonte
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'var(--font_color)',  // Cor dos números (eixo Y)
                    fontSize: '12px', // Adicione o tamanho da fonte
                }
            }
        },
        legend: {
            labels: {
                colors: 'var(--font_color)',  // Cor do texto da legenda
            }
        },
        colors: [ '#00a4fd'], // define a onda
        dataLabels: {
            style: {
                colors: ['#00a4fd'] // define a cor dos botoes
            }
        },
        stroke: {
            curve: 'smooth', // Use um valor válido como 'smooth', 'straight', etc.
            width: [2, 2], 
            colors: ['#00a4fd'] // cor da linha 
        }
    };

    const series = [
        {
            name: "Leitura do hidrômetro",
            data: chartDataProp ? chartDataProp.volumes : [],
        }
    ];

    if (!chartDataProp) return null;

    return (
        <>
            <div className="bg-white dark:bg-darksecondary dark:shadow-none shadow-lg shadow-slate-600 mb-10 rounded-md">
                <Chart options={options} series={series} type='area' height={400} />
            </div>
        </>
    );
}

export default Graphic;
