import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos, getAuth, get } from '../authService';

export default function Index() {
    const navigation = useNavigation();
    const route = useRoute();
    const { nombre, token } = route.params;
    const [eventos, setEventos] = useState([]);
    const [id, setId] = useState(null);

    const getId = async () => {
        const endpoint = 'user/username/' + nombre;
        const user = await getAuth(endpoint, token);
        return user.id;
    };

    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
    }

    const canAddAttendant = async (event) => {
        const enlistados = await get('event/enrollment/' + event.id.toString());
        return enlistados.length < event.maxAssistant;
    }

    const fetchEventos = async () => {
        try {
            const data = await getEventos(token);
            setEventos(data);
        } catch (error) {
            console.error('Error al cargar los eventos:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userId = await getId();
            setId(userId);
            await fetchEventos();
        };
        fetchData();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Próximos Eventos</h1>

            <div style={styles.cardContainer}>
                {eventos.filter(isDateFuture).map(item => (
                    <div style={styles.eventContainer} key={item.id}>
                        <h2 
                            style={styles.eventTitle} 
                            onClick={() => navigation.navigate('DetalleEvento', { token: token, idUser: id, idEvent: item.id, evento: item })}
                        >
                            {item.name}
                        </h2>
                        {canAddAttendant(item)
                            ? <p style={styles.attendantText}>Únete</p>
                            : <p style={styles.attendantText}>No hay más entradas</p>}
                    </div>
                ))}
            </div>

            <div style={styles.buttonContainer}>
                <button 
                    style={{ ...styles.boton, ...styles.crearEvento }} 
                    onClick={() => navigation.navigate('Formulario', { token: token, idUser: id, nombre_user: nombre })}
                >
                    Crear Evento
                </button>

                {id === 34 || id === 36 ? (
                    <button 
                        style={{ ...styles.boton, ...styles.verTodos }} 
                        onClick={() => navigation.navigate("Panel", { token: token })}
                    >
                        Ver todos
                    </button>
                ) : null}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8F9FD',
        padding: '20px',
        justifyContent: 'center', // Centra los elementos verticalmente
        alignItems: 'center', // Centra los elementos horizontalmente
        minHeight: '100vh', // Hace que el contenedor ocupe toda la altura de la pantalla
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '30px',
        textAlign: 'center',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        width: '80%',
    },
    eventContainer: {
        width: '45%',  // Ajustado para mostrar más contenedores en el centro
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        color: 'grey',
    },
    eventTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: '10px',
    },
    attendantText: {
        fontSize: '14px',
        fontStyle: 'italic',
        color: '#888',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '40px',
    },
    boton: {
        width: '300px',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '10px',
        transition: 'all 0.3s ease',
    },
    crearEvento: {
        backgroundColor: '#34A853',  // Verde brillante para Crear Evento
    },
    verTodos: {
        background: 'linear-gradient(145deg, #6d7c96, #4a5468)', 
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
};
