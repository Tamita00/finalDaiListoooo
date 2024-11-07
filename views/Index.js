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
                        <p>{item.start_date}</p>
                        {canAddAttendant(item)
                            ? <p style={styles.attendantText}>Puedes unirte</p>
                            : <p style={styles.attendantText}>Entradas agotadas</p>}
                    </div>
                ))}
            </div>

            <button 
                style={{ ...styles.boton, ...styles.crearEvento }} 
                onClick={() => navigation.navigate('Formulario', { token: token, idUser: id, nombre_user: nombre })}
            >
                Crear nuevo evento
            </button>

            {id === 34 || id === 36 ? (
                <button 
                    style={{ ...styles.boton, ...styles.verTodos }} 
                    onClick={() => navigation.navigate("Panel", { token: token })}
                >
                    Ver todos los eventos
                </button>
            ) : null}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8F9FD',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'center',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    eventContainer: {
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    eventTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#007bff',
    },
    attendantText: {
        fontSize: '14px',
        fontStyle: 'italic',
        color: '#888',
    },
    boton: {
        width: '80%',
        padding: '14px',
        borderRadius: '8px',
        textAlign: 'center',
        margin: '10px auto',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
    },
    crearEvento: {
        backgroundColor: '#34A853',  // Botón verde para crear evento
    },
    verTodos: {
        backgroundColor: 'transparent',
        border: '2px solid #34A853',  // Borde verde para ver todos los eventos
    },
};

