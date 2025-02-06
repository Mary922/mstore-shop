// "use client"
// import React, {useEffect, useState} from "react";
// import {getImagesStatic} from "@/app/lib/api/images";
// import CarouselComponent from "@/app/common/CarouselComponent";
//
// export default function HomePage() {
//     const [imagePaths, setImagePaths] = useState([]);
//
//     useEffect(()=> {
//         (async () => {
//             const res = await getImagesStatic('web','home');
//             console.log('res',res);
//
//             let paths = [];
//             if (res?.data) {
//                 res.data.map(image => {
//                     paths.push(image.image_path);
//                     setImagePaths(paths);
//                 })
//             }
//         })();
//     },[])
//
//     console.log('imagePaths',imagePaths);
//
//
//     return (
//         <>
//             <CarouselComponent paths={imagePaths}
//                 // activeIndex={index}
//             />
//         </>
//     )
// }
