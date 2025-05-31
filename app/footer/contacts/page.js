"use client"

import MapComponentWithMarker from "@/app/ui/maps/YandexMap";
import MainLayout from "@/app/ui/MainLayout";

export default function ContactPage() {

    return (
        <>
            <MainLayout>
                <div className='flex w-full h-full bg-blue-400'>
                    <MapComponentWithMarker latitude={55.744843} longitude={37.565866}/>
                </div>
            </MainLayout>
        </>
    )
}