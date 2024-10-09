// Importamos los módulos y componentes necesarios de 'react-native' y 'react-native-chart-kit'
import { StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

export default function GraficoReporteEnfermedades({ dataReporteEnfermedades }) {
    const screenWidth = Dimensions.get("window").width;
    const squareSize = 30;  // Tamaño de cada cuadrado del gráfico
    const numDays = 365;    // Número total de días que se mostrarán en el gráfico (365 días = 1 año)

    // Función para personalizar las etiquetas de los meses en el gráfico
    const getMonthLabel = (monthIndex) => {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return months[monthIndex];  // Devuelve el nombre del mes basado en su índice
    };

    // Función que maneja el evento de presionar un cuadrado en el gráfico (un día específico)
    const handleDayPress = (day) => {
        Alert.alert(`Reportes`, `Fecha: ${day.date}\nCantidad: ${day.count}`);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <ContributionGraph
                    values={dataReporteEnfermedades}  // Datos del gráfico (fecha y valor)
                    endDate={new Date("2017-12-30")}  // Fecha final para el gráfico
                    numDays={numDays}  // Número de días a mostrar en el gráfico
                    width={1680}  // Ancho del gráfico
                    height={300}  // Altura del gráfico
                    chartConfig={{
                        backgroundColor: "#fff",  // Color de fondo del gráfico
                        backgroundGradientFrom: "#f0f0f0",  // Color inicial del gradiente de fondo
                        backgroundGradientTo: "#f0f0f0",  // Color final del gradiente de fondo
                        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,  // Color de los cuadrados
                        strokeWidth: 2,  // Grosor de las líneas del gráfico
                    }}
                    gutterSize={0.4}  // Espaciado entre los cuadrados del gráfico
                    bgColor={"transparent"}  // Fondo del gráfico transparente
                    squareSize={squareSize}  // Tamaño de los cuadrados en el gráfico
                    getMonthLabel={getMonthLabel}  // Función para personalizar etiquetas de los meses
                    onDayPress={handleDayPress}  // Callback para manejar el evento de presionar un día
                    style={{ borderRadius: 10 }}  // Bordes redondeados en el gráfico
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});
