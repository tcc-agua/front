import Chart from 'react-apexcharts'

const Graphic = ({ chartDataProp }) => {
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: chartDataProp ? chartDataProp.months : [],
        },
        colors: ['#00A4FD', '#a1dfdb'], // define a onda
        dataLabels: {
            style: {
                colors: ['#00A4FD', '#66b8b2'] // define a cor dos botoes
            }
        },
        stroke: {
            curve: 'smooth',
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
