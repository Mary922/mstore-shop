import { useEffect, useState } from 'react';

export default function ScrollDownComponent() {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const leftContent = document.getElementById('left-content');

        const handleScroll = () => {
            // Ограничиваем смещение, чтобы правый блок не уезжал за пределы
            const maxOffset = leftContent.scrollHeight - window.innerHeight;
            const offset = Math.min(leftContent.scrollTop, maxOffset);
            setScrollOffset(offset);
        };

        leftContent.addEventListener('scroll', handleScroll);
        return () => leftContent.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex relative">
            <div
                id="left-content"
                className="flex-1 p-4 bg-gray-50 h-[200vh] overflow-y-auto"
            >
                <h1 className="text-2xl font-bold">Основной контент</h1>
                <div style={{ height: "200vh" }}>Прокручивайте меня!</div>
            </div>

            <div
                id="right-sidebar"
                className="w-80 p-4 bg-yellow-50 border-l border-gray-200 fixed top-0 bottom-0 right-0"
                style={{ transform: `translateY(${scrollOffset}px)` }}
            >
                <h2 className="text-xl font-semibold">Боковая панель</h2>
                <p>Фиксирован, но двигается вниз при скролле.</p>
            </div>
        </div>
    );
}