import React from 'react';
import GraficoReporteEnfermedades from './src/GraficoReporteEnfermedades';

const dataReporteEnfermedades = [
    { date: "2017-01-05", count: 8 },
    { date: "2017-01-19", count: 5 },
    { date: "2017-02-06", count: 2 },
    { date: "2017-02-20", count: 4 },
    { date: "2017-03-07", count: 1 },
    { date: "2017-03-21", count: 3 },
    { date: "2017-04-05", count: 6 },
    { date: "2017-04-19", count: 2 },
    { date: "2017-05-03", count: 4 },
    { date: "2017-05-17", count: 7 },
    { date: "2017-06-06", count: 9 },
    { date: "2017-06-20", count: 5 },
    { date: "2017-07-05", count: 3 },
    { date: "2017-07-19", count: 4 },
    { date: "2017-08-07", count: 2 },
    { date: "2017-08-21", count: 8 },
    { date: "2017-09-06", count: 3 },
    { date: "2017-09-20", count: 7 },
    { date: "2017-10-04", count: 5 },
    { date: "2017-10-18", count: 6 },
    { date: "2017-11-06", count: 2 },
    { date: "2017-11-20", count: 9 },
    { date: "2017-12-05", count: 4 },
    { date: "2017-12-19", count: 7 }
];

export default function App() {
    return (
        <GraficoReporteEnfermedades dataReporteEnfermedades={dataReporteEnfermedades} />
    );
}
