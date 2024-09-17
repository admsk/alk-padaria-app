import { useEffect, useState } from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './../pages/home'
import { Comunicate } from '../pages/comunicate'
import { Sobre } from '../pages/sobre'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';

import AppConstants from '../constants/common';
import dataRepository from '../data/dataRepository'


const Tab = createBottomTabNavigator();

export function Routes() {

    const [isTabEnabled, setIsTabEnabled] = useState(false);

    const [deviceId, setDeviceId] = useState(null);

    useEffect(() => {
        const getInfoUserDevices = async () => {
            const deviceId = Constants.deviceName;
            setDeviceId(Constants.deviceName);
        };

        const getInfoDevicesSharePoint = async () => {

            const data = await dataRepository.get(`${AppConstants.WEBURL}/_api/Web/Lists/GetByTitle('Notificacoes')/items?$select=ID,Title,Tempo,Frase1,Frase2,Devices,Modified`);


            if (data[0].Devices.split(';').includes(Constants.deviceName)) {
                setIsTabEnabled(true);
            }
            else {
                setIsTabEnabled(false);
            }
        }

        getInfoUserDevices();
        getInfoDevicesSharePoint();

    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: (focused, size, color) => {
                        if (focused) {
                            return <Ionicons name="home" size={20} color={"#bca47c"} />
                        }
                        return <Ionicons name="home-outline" size={20} color={"#8f6d35"} />

                    }
                }}
            />
            <Tab.Screen
                name="sobre"
                component={Sobre}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: (focused, size, color) => {
                        if (focused) {
                            return <Ionicons name="information-circle-outline" size={20} color={"#bca47c"} />
                        }
                        return <Ionicons name="information-circle-outline" size={20} color={"#8f6d35"} />

                    }
                }}
            />
            {
                isTabEnabled &&
                <Tab.Screen
                    name="passwords"
                    component={Comunicate}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: (focused, size, color) => {
                            if (focused) {
                                // return <Image source={bread} style={{ width: 25, height: 25 }} />                              
                                return <Ionicons name="arrow-up" size={20} color={"#bca47c"} />
                            }
                            // return <Image source={bread} style={{ width: 25, height: 25 }} />
                            return <Ionicons name="arrow-up-outline" size={20} color={"#bca47c"} />

                        }
                    }} />
            }
        </Tab.Navigator>
    );
}
