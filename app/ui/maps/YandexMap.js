import React from 'react';
import dynamic from 'next/dynamic';
import {lazy,Suspense} from "react";
// import {YMaps, Map, Placemark} from 'react-yandex-maps';


const YMaps = lazy(() => import('react-yandex-maps').then(mod => ({ default: mod.YMaps })));
const Map = lazy(() => import('react-yandex-maps').then(mod => ({ default: mod.Map })));
const Placemark = lazy(() => import('react-yandex-maps').then(mod => ({ default: mod.Placemark})));

// const YMaps = dynamic(() => import('react-yandex-maps').then((mod) => ({
//         YMaps: mod.YMaps,
//         // Map: mod.Map,
//         // Placemark: mod.Placemark,
//     })),
//     {
//         ssr: false,
//         loading: () => <p>Загрузка карты...</p>,
//     }
// );
//
// const Map = dynamic(() => import('react-yandex-maps').then(mod => mod.Map), {
//     ssr: false, // Отключаем SSR
//     loading: () => null, // Можно оставить пустым, если не нужно сообщение загрузки
// });
//
// const Placemark = dynamic(() => import('react-yandex-maps').then(mod => mod.Placemark), {
//     ssr: false, // Отключаем SSR
//     loading: () => null, // Можно оставить пустым, если не нужно сообщение загрузки
// })


export default function MapComponentWithMarker({latitude, longitude}) {

    console.log('latitude', latitude);
    console.log('longitude', longitude);

    const mapState = {
        center: [latitude, longitude], // Центр карты на переданных координатах
        zoom: 10, // Уровень масштабирования
    };

    return (
        <Suspense fallback={<p>Загрузка карты...</p>}>
        <YMaps query={{apikey: '1368ca50-a0c2-4c69-921a-901369fbb2ae'}}>
            <Map state={mapState} width="100%" height="400px">
                <Placemark geometry={[latitude, longitude]}/>
            </Map>
        </YMaps>
        </Suspense>

    );
};


// import React from 'react';
// import { YMaps, Map, Placemark } from 'react-yandex-maps';
//
//
// const YandexMap = ({latitude,longitude}) => {
//     const mapState = {
//         center: [latitude, longitude], // Координаты центра карты (Москва)
//         zoom: 10, // Уровень масштабирования
//     };
//
//     return (
//         <YMaps>
//             <Map state={mapState} width="100%" height="400px">
//                 <Placemark geometry={[latitude,longitude]} />
//             </Map>
//         </YMaps>
//     );
// };
//
// export default YandexMap;



