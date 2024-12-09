import Card from 'react-bootstrap/Card';
import CarouselComponent from "./common/CarouselComponent";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {

    let paths = ['children-playing-grass.jpg', 'children-posing.jpg', 'group-girls-boys.jpg']

    let images = [];
    for (let i = 0; i < paths.length; i++) {
        images.push(
            <Carousel.Item key={i}><img src={paths[i]}/></Carousel.Item>
        )
    }

    return (
        <>
            <Card>
                <Carousel interval={5000}>
                    {images}
                </Carousel>
                {/*<CarouselComponent*/}
                {/*    paths={paths}*/}
                {/*    className={'d-block w-100'}*/}
                {/*    interval={5000}/>*/}
            </Card>
        </>
    )
}
export default Home;