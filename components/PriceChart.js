import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import useFetchPricesByProduct from '../hooks/useFetchPricesByProduct'; // Ajusta la ruta según tu estructura

// Registrar componentes necesarios para Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PriceChart = ({ productCode }) => {
    const { prices, loading, error, fetchPricesByProduct } = useFetchPricesByProduct();

    useEffect(() => {
        if (productCode) {
            fetchPricesByProduct(productCode);
        }
    }, [productCode]);

    // Preparar los datos para el gráfico
    const prepareChartData = () => {
        const commerceLabels = [];
        const datasets = [];

        const commerceMap = {};

        prices.forEach(price => {
            const { commerce, date, price: productPrice } = price;
            const formattedDate = moment(date).format('YYYY-MM-DD'); // Formatear la fecha con moment

            if (!commerceMap[commerce]) {
                commerceMap[commerce] = {
                    label: commerce,
                    data: [],
                    borderColor: getRandomColor(), // Función para obtener un color aleatorio
                    backgroundColor: 'rgba(0,0,0,0)', // Fondo transparente
                    fill: false,
                };
            }

            commerceMap[commerce].data.push({ x: formattedDate, y: productPrice });

            if (!commerceLabels.includes(formattedDate)) {
                commerceLabels.push(formattedDate);
            }
        });

        Object.values(commerceMap).forEach(commerce => {
            datasets.push(commerce);
        });

        return {
            labels: commerceLabels,
            datasets: datasets,
        };
    };

    // Función para obtener un color aleatorio para las líneas
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const chartData = prepareChartData();

    if (loading) return <p>Cargando gráficos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Gráfico de Precios</h2>
            <div style={{ height: '200px' }}>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, // Desactiva el ratio de aspecto para que la altura se aplique correctamente
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        return `${context.dataset.label}: $${context.raw.y}`;
                                    },
                                },
                            },
                        },
                        scales: {
                            x: {
                                type: 'category',
                                title: {
                                    display: true,
                                    text: 'Fecha',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Precio',
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default PriceChart;
