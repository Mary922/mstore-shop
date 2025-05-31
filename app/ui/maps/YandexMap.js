import React from 'react';
import dynamic from 'next/dynamic';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

const YandexMap = dynamic(
    () => Promise.resolve(function MapWithMarker({latitude, longitude}) {
        return (
            <YMaps
                query={{
                    apikey: '1368ca50-a0c2-4c69-921a-901369fbb2ae',
                    lang: 'ru_RU',
                    load: 'package.full',
                    suppressMapOpenBlock: true,
                    ns: "ymaps-disable-search"
                }}
            >
                <Map
                    state={{
                        center: [latitude, longitude],
                        zoom: 15,
                    }}
                    width="100%"
                    height="400px"
                >
                    <Placemark
                        geometry={[latitude, longitude]}
                        properties={{
                            hintContent: 'Наше местоположение',
                            balloonContent: 'Мы находимся здесь!',
                        }}
                        options={{
                            preset: 'islands#redIcon',
                            iconColor: '#ff0000',
                        }}
                    />
                </Map>
            </YMaps>
        );
    }),
    {ssr: false, loading: () => <p>Загрузка карты...</p>}
);

export default function MapComponentWithMarker({latitude, longitude}) {
    if (!latitude || !longitude) {
        return <div>Неверные координаты</div>;
    }

    return (
        <div style={{width: '100%', height: '400px'}}>
            <YandexMap
                key={`map-${latitude}-${longitude}`}
                latitude={latitude}
                longitude={longitude}
            />
        </div>
    );
};



