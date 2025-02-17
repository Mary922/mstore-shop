"use client"

import MapComponentWithMarker from "@/app/ui/maps/YandexMap";

export default function ContactPage() {

    return (
        <div className='flex w-full h-full bg-blue-400'>
            {/*<div>lala</div>*/}
            <MapComponentWithMarker latitude={55.744843} longitude={37.565866}/>
        </div>
    )
}


// <div className="flex flex-col w-full">
//     <h1>Наши контакты</h1>
//     <div> г. Москва, пл. Киевского Вокзала, 2
//     </div>
//     <div>Телефон: 8 800 111-11-11</div>
// </div>
//