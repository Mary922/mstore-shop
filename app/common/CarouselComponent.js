import Carousel from "react-bootstrap/Carousel";


const CarouselComponent = ({paths,className,interval, width, height,index,onSelect,redirect}) => {

    let baseUrl = 'http://localhost:3001/images'


    let arrayOfCarouselItems = [];
    for (let i = 0; i < paths.length; i++) {
        arrayOfCarouselItems.push(
            <Carousel.Item key={i}>
                <img
                    onClick={redirect}
                    className={className}
                    src={`${baseUrl}/${paths[i]}`}
                    width={width}
                    height={height}
                />
            </Carousel.Item>)

    }


    return (
        <>
            <Carousel data-bs-theme="dark" interval={null} activeIndex={index} onSelect={onSelect}>
                {arrayOfCarouselItems}

                {/*<Carousel.Item interval={5000}>*/}
                {/*    <img*/}
                {/*        className="d-block w-100"*/}
                {/*        src=""*/}
                {/*        alt="First slide"*/}
                {/*    />*/}
                {/*    <Carousel.Caption>*/}
                {/*        <h5>First slide label</h5>*/}
                {/*        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                {/*    </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}
                {/*<Carousel.Item interval={4000}>*/}
                {/*    <img*/}
                {/*        className="d-block w-100"*/}
                {/*        src="children-posing.jpg"*/}
                {/*        alt="Second slide"*/}
                {/*    />*/}
                {/*    <Carousel.Caption>*/}
                {/*        <h5>Second slide label</h5>*/}
                {/*        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                {/*    </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}
                {/*<Carousel.Item interval={5000}>*/}
                {/*    <img*/}
                {/*        className="d-block w-100"*/}
                {/*        src="group-girls-boys.jpg"*/}
                {/*        alt="Third slide"*/}
                {/*    />*/}
                {/*    <Carousel.Caption>*/}
                {/*        <h5>Third slide label</h5>*/}
                {/*        <p>*/}
                {/*            Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
                {/*        </p>*/}
                {/*    </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}
            </Carousel>
        </>
    )
}
export default CarouselComponent;