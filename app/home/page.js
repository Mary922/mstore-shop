import Card from 'react-bootstrap/Card';
import Carousel from "react-bootstrap/Carousel";

export default function HomePage() {

    let paths = ['children-playing-grass.jpg', 'children-posing.jpg', 'group-girls-boys.jpg']

    // let images = [];
    // for (let i = 0; i < paths.length; i++) {
    //     images.push(
    //         <Carousel.Item key={i}><img src={paths[i]}/></Carousel.Item>
    //     )
    // }

    return (
        <>
            <Card>
                <div>its home page</div>
                {/*<Carousel interval={5000}>*/}
                {/*    {images}*/}
                {/*</Carousel>*/}
            </Card>
        </>
    )
}
