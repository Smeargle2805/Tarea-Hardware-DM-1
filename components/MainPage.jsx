import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/MainPage';

export default function Lupa() {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null);

    const [showCamera, setShowCamera] = useState(false);

    const handleUseLupa = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setShowCamera(true);
        } else {
            alert('Se requieren permisos de camara para utilizar la lupa.');
        }
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 1));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 0));
    };

    const handleReturnToLupa = () => {
        setShowCamera(false);
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Necesitamos tu permiso para mostrar la camara</Text>
                <Button onPress={requestPermission} title="Conceder permiso" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showCamera ? (
                <Camera style={styles.camera} type={type} zoom={zoom} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleReturnToLupa()}>
                            <Text style={styles.text}>Regresar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
                            <Text style={styles.text}>+Zoom</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
                            <Text style={styles.text}>-Zoom</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                            <Text style={styles.text}>Cambiar Camara</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            ) : (
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', marginBottom: 20 }}>¡Haz clic en el boton para usar la Lupa!</Text>
                    <Button onPress={handleUseLupa} title="Usar Lupa" />
                </View>
            )}
        </View>
    );
}
