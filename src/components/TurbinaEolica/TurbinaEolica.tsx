"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function EnergiaEolica() {
    const [relatorio, setRelatorio] = useState({
        producao: "",
        consumo: "",
        eficiencia: "",
    });

    const dados = {
        datas: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05"],
        producoes: [200, 250, 230, 280, 300],
        consumos: [180, 190, 200, 220, 230],
        eficiencia: [90, 95, 87, 93, 96],
    };

    // Gera o relatório baseado nos dados
    useEffect(() => {
        const totalProducao = dados.producoes.reduce((a, b) => a + b, 0);
        const totalConsumo = dados.consumos.reduce((a, b) => a + b, 0);
        const mediaEficiencia = (dados.eficiencia.reduce((a, b) => a + b, 0) / dados.eficiencia.length).toFixed(2);

        setRelatorio({
            producao: `A produção total de energia eólica no período foi de ${totalProducao} kWh, com o pico de ${Math.max(
                ...dados.producoes
            )} kWh registrado em ${dados.datas[dados.producoes.indexOf(Math.max(...dados.producoes))]}.`,
            consumo: `O consumo total de energia no período foi de ${totalConsumo} kWh, mantendo-se inferior à produção, o que garante energia excedente para outras aplicações.`,
            eficiencia: `A eficiência média do sistema eólico foi de ${mediaEficiencia}%, com a maior eficiência de ${Math.max(
                ...dados.eficiencia
            )}% registrada em ${dados.datas[dados.eficiencia.indexOf(Math.max(...dados.eficiencia))]}.`,
        });
    }, []);

    const producaoData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Produção Eólica (kWh)",
                data: dados.producoes,
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const consumoData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Consumo de Energia (kWh)",
                data: dados.consumos,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const eficienciaData = {
        labels: dados.datas,
        datasets: [
            {
                label: "Eficiência (%)",
                data: dados.eficiencia,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Data" } },
            y: { title: { display: true, text: "Valores" } },
        },
    };

    return (
        <>
            <Header/>
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center" }}>Análise de Energia Eólica</h1>

                <h2 style={{ textAlign: "center" }}>Produção de Energia Eólica</h2>
                <Line data={producaoData} options={options} />

                <h2 style={{ textAlign: "center" }}>Consumo de Energia</h2>
                <Line data={consumoData} options={options} />

                <h2 style={{ textAlign: "center" }}>Eficiência do Sistema Eólico</h2>
                <Line data={eficienciaData} options={options} />

                <div style={{ background: "#f9f9f9", border: "1px solid #ddd", padding: "15px", marginTop: "20px", borderRadius: "5px" }}>
                    <h3>Relatório Explicativo</h3>
                    <p>{relatorio.producao}</p>
                    <p>{relatorio.consumo}</p>
                    <p>{relatorio.eficiencia}</p>
                </div>
            </div>
        </>
    );
}
