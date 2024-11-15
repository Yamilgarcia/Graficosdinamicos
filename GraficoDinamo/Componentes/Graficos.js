import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import GraficoSalarios from './GraficoSalarios';
import GraficoGeneros from './GraficoGeneros';
import Formulario from './Formulario';
import GraficoReporteEnfermedades from './GraficoReporteEnfermades';
import GraficoProgreso from './GraficoProgreso';
import GraficoBezier from './GraficoBezier';
import GraficoFiltrado from './GraficoFiltrado';
import { collection, getDocs, query } from 'firebase/firestore';
import db from '../firebase';

export default function Graficos() {
  const [bandera, setBandera] = useState(false);
  const [dataSalarios, setDataSalarios] = useState({
    labels: [''],
    datasets: [{ data: [0] }]
  });
  const [dataProgreso, setDataProgreso] = useState({
    labels: [''],
    data: [0]
  });
  const [dataGeneros, setDataGeneros] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState({ labels: [], datasets: [{ data: [] }] });
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Ventas');

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

  const registros = [
    { fecha: "2018-01-15", categoria: "Ventas", valor: 450, monto: 11250, responsable: "Juan Pérez" },
    { fecha: "2018-01-15", categoria: "Ventas", valor: 450, monto: 11250, responsable: "Ana Gómez" },
    { fecha: "2018-06-20", categoria: "Servicios", valor: 520, monto: 13000, responsable: "Ana Gómez" },
    { fecha: "2019-03-12", categoria: "Proyectos", valor: 700, monto: 35000, responsable: "Laura Sánchez" },
    { fecha: "2019-08-25", categoria: "Ventas", valor: 800, monto: 20000, responsable: "Carlos Martínez" },
    { fecha: "2020-02-10", categoria: "Servicios", valor: 600, monto: 15000, responsable: "David Ramírez" },
    { fecha: "2020-09-05", categoria: "Proyectos", valor: 950, monto: 47500, responsable: "Marta López" },
    { fecha: "2021-01-18", categoria: "Ventas", valor: 1100, monto: 27500, responsable: "Andrés Torres" },
    { fecha: "2021-07-29", categoria: "Servicios", valor: 650, monto: 16250, responsable: "Elena Moreno" },
    { fecha: "2022-03-14", categoria: "Proyectos", valor: 980, monto: 49000, responsable: "Laura Sánchez" },
    { fecha: "2022-11-22", categoria: "Ventas", valor: 1200, monto: 30000, responsable: "Juan Pérez" },
    { fecha: "2023-04-09", categoria: "Servicios", valor: 700, monto: 17500, responsable: "Ana Gómez" },
    { fecha: "2023-10-15", categoria: "Proyectos", valor: 1050, monto: 52500, responsable: "Carlos Martínez" },
    { fecha: "2024-02-01", categoria: "Ventas", valor: 1300, monto: 32500, responsable: "David Ramírez" },
    { fecha: "2024-06-18", categoria: "Servicios", valor: 750, monto: 18750, responsable: "Marta López" },
    { fecha: "2024-11-05", categoria: "Proyectos", valor: 1150, monto: 57500, responsable: "Elena Moreno" }
  ];

  useEffect(() => {
    const recibirDatosSalarios = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        const nombres = [];
        const salarios = [];

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { nombre, salario } = datosBD;
          nombres.push(nombre);
          salarios.push(salario);
        });

        setDataSalarios({
          labels: nombres,
          datasets: [{ data: salarios }]
        });
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosSalarios();
  }, [bandera]);

  useEffect(() => {
    const recibirDatosGeneros = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        let masculino = 0;
        let femenino = 0;

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { genero } = datosBD;

          if (genero === "Masculino") masculino += 1;
          else if (genero === "Femenino") femenino += 1;
        });

        const totalData = [
          {
            name: "Masculino",
            population: masculino,
            color: "rgba(131, 167, 234, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          },
          {
            name: "Femenino",
            population: femenino,
            color: "rgba(255, 105, 180, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          }
        ];

        const totalPersonas = masculino + femenino;
        const progresos = [masculino / totalPersonas, femenino / totalPersonas];

        setDataProgreso({
          labels: ['Hombres', 'Mujeres'],
          data: progresos
        });

        setDataGeneros(totalData);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosGeneros();
  }, [bandera]);

  const filtrarMontoPorFechaYCategoria = (categoria) => {
    const registrosFiltrados = registros.filter(item => item.categoria === categoria);

    const datosAgrupados = registrosFiltrados.reduce((acumulado, actual) => {
      const indice = acumulado.labels.indexOf(actual.fecha);

      if (indice > -1) {
        acumulado.datasets[0].data[indice] += actual.monto;
      } else {
        acumulado.labels.push(actual.fecha);
        acumulado.datasets[0].data.push(actual.monto);
      }

      return acumulado;
    }, { labels: [], datasets: [{ data: [] }] });

    setDatosFiltrados(datosAgrupados);
  };

  useEffect(() => {
    filtrarMontoPorFechaYCategoria(categoriaSeleccionada);
  }, [categoriaSeleccionada]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <GraficoSalarios dataSalarios={dataSalarios}/>
        <GraficoBezier dataSalarios={dataSalarios}/>
        <GraficoGeneros dataGeneros={dataGeneros}/>
        <GraficoReporteEnfermedades dataReporteEnfermedades={dataReporteEnfermedades}/>
        <GraficoProgreso 
          dataProgreso={dataProgreso}
          colors={['rgba(131, 167, 234, 0.5)', 'rgba(255, 105, 180, 0.5)']}   
        />
        <GraficoFiltrado 
          datosFiltrados={datosFiltrados}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          filtrarMontoPorFechaYCategoria={filtrarMontoPorFechaYCategoria}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
});
