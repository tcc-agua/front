import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

interface ChartDataProp {
    months: string[];
    expense: number[];
    income: number[];
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
            categories: chartDataProp ? chartDataProp.months : [],
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
        colors: ['#00A4FD', '#a1dfdb'], // define a onda
        dataLabels: {
            style: {
                colors: ['#00A4FD', '#66b8b2'] // define a cor dos botoes
            }
        },
        stroke: {
            curve: 'smooth', // Use um valor válido como 'smooth', 'straight', etc.
            width: [2, 2], 
            colors: [ '#00A4FD', '#66b8b2'] // cor da linha 
        }
    };

    const series = [
        {
            name: "Semana Atual",
            data: chartDataProp ? chartDataProp.expense : [],
        },
        {
            name: "Previsão",
            data: chartDataProp ? chartDataProp.income : [],
        }
    ];

    if (!chartDataProp) return null;

    return (
        <>
            <div className="bg-white dark:bg-darksecondary dark:shadow-none shadow-lg shadow-slate-600 mb-10 rounded-md">
                <Chart options={options} series={series} type='area' height={260} />
            </div>
        </>
    );
}

export default Graphic;
