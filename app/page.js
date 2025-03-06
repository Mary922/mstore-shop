"use client"
import Carousel from "react-bootstrap/Carousel";
import CarouselComponent from "@/app/common/CarouselComponent";
import React, {useEffect, useState} from "react";
import {getImagesStatic} from "@/app/lib/api/images";


export default function Home() {
    const [imagePaths, setImagePaths] = useState([]);

    useEffect(()=> {
        (async () => {
            const res = await getImagesStatic('web','home');
            // console.log('res',res);

            let paths = [];
            if (res?.data) {
                res.data.map(image => {
                    paths.push(image.image_path);
                    setImagePaths(paths);
                })
            }
        })();
    },[])

    // console.log('imagePaths',imagePaths);

    return (
        <>
            <div className=" bg-orange-400 bg-cover relative overflow-hidden bg-center w-full h-screen">
            <CarouselComponent staticPaths={imagePaths}
                               // activeIndex={index}
            />
            </div>


          {/*  <div className="carousel w-full">*/}
          {/*      <div id="slide1" className="carousel-item relative w-full">*/}
          {/*          <img*/}
          {/*              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"*/}
          {/*            className="w-full"/>*/}
          {/*        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">*/}
          {/*            <a href="#slide4" className="btn btn-circle">❮</a>*/}
          {/*            <a href="#slide2" className="btn btn-circle">❯</a>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*    <div id="slide2" className="carousel-item relative w-full">*/}
          {/*        <img*/}
          {/*            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"*/}
          {/*            className="w-full"/>*/}
          {/*        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">*/}
          {/*            <a href="#slide1" className="btn btn-circle">❮</a>*/}
          {/*            <a href="#slide3" className="btn btn-circle">❯</a>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
      </>
  );
}
