import { StyleSheet, View, Dimensions } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import { Button, Alert } from 'react-native';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos

export default function GraficoProgreso({ dataProgreso, colors }) {

  let screenWidth = Dimensions.get("window").width

  const generarPDF = async () => {
    try {
      // Crear una instancia de jsPDF
      const doc = new jsPDF();

      // Agregar título al PDF
      doc.text("Reporte de Progreso", 10, 10);

      // Agregar los datos al PDF
      dataProgreso.labels.forEach((label, index) => {
        const progreso = (dataProgreso.data[index] * 100).toFixed(2); // Convertir a porcentaje
        doc.text(`${label}: ${progreso}%`, 10, 20 + index * 10); // Formato de los datos
      });

      // Generar el PDF como base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      // Definir la ruta temporal para el archivo PDF en el sistema de archivos del dispositivo
      const fileUri = `${FileSystem.documentDirectory}reporte_progreso.pdf`;

      // Guardar el archivo PDF
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Compartir el archivo PDF
      await Sharing.shareAsync(fileUri);

    } catch (error) {
      console.error("Error al generar o compartir el PDF: ", error);
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <ProgressChart
        data={dataProgreso}
        width={screenWidth - (screenWidth * 0.1)}
        height={300}
        chartConfig={{
          backgroundColor: '#022173',
          backgroundGradientFrom: '#022173',
          backgroundGradientTo: '#1b3fa0',
          color: (opacity = 1, index) => colors[index] || `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
          borderRadius: 10,
        }}
        hideLegend={false}
        strokeWidth={10}
        radius={32}
      />
      <Button title="Generar y Compartir PDF" onPress={generarPDF} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10
  },
});
