import React, { useEffect, useState } from "react";
import { Container, Row, Carousel, Col, Card } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const Gallery = (props) => {
  useEffect(() => {
    fixClickAnimation();
  }, []);

  function fixClickAnimation() {
    const innerCarousel = document.querySelectorAll(".carousel-inner");
    if (innerCarousel) {
      innerCarousel.forEach((carousel) => {
        carousel.classList.add("overflow-visible");
      });
    }
    let timeout;
    let buttons = document.querySelectorAll(".carousel a[role=button]");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let inner = event.currentTarget.closest(".carousel").querySelector(".carousel-inner");
        inner.classList.add("overflow-hidden");
        inner.classList.remove("overflow-visible");
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          inner.classList.add("overflow-visible");
          inner.classList.remove("overflow-hidden");
        }, 650);
      });
    });
  }
  function fixAutoAnimation() {
    let inners = document.querySelectorAll(".carousel-inner");
    inners.forEach((inner) => {
      inner.classList.add("overflow-hidden");
      inner.classList.remove("overflow-visible");
      setTimeout(function () {
        inner.classList.add("overflow-visible");
        inner.classList.remove("overflow-hidden");
      }, 650);
    });
  }

  const isSm = useMediaQuery({ maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isXl = useMediaQuery({ minWidth: 1200 });
  const [maxSliderItem, setMaxSliderItem] = useState(3);
  const [matrix, setMoviesMatrix] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    if (isXl) setMaxSliderItem(6);
    else if (isMd) setMaxSliderItem(4);
    else if (isSm) setMaxSliderItem(3);
  }, [isSm, isMd, isXl]);

  useEffect(() => {
    const matrix = [];
    for (let i = 0; i < props.list.list.length; i += maxSliderItem) {
      matrix.push(props.list.list.slice(i, i + maxSliderItem));
    }
    setMoviesMatrix(matrix);
  }, [props.list, maxSliderItem]);

  useEffect(() => {
    if (activeIndex == matrix.length) {
      fixAutoAnimation();
      setActiveIndex(0);
    }
  }, [matrix]);

  return (
    <Container className="mb-5">
      <Carousel
        id="carouselExample"
        className="slide"
        indicators={false}
        interval={null}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      >
        {matrix.map((array, arrayIndex) => (
          <Carousel.Item key={"carouselItem-" + arrayIndex}>
            <Row className="gx-1">
              {array.map((item, index) => (
                <Col
                  key={"poster-" + arrayIndex + "-" + index}
                  className={isSm ? "col-4" : isMd ? "col-4 col-md-3" : isXl ? "col-4 col-md-3 col-xl-2" : "kebab"}
                  onClick={() => props.handleSetInterval(item)}
                >
                  <Card>
                    <Card.Img variant="top" src={` https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`} />
                    <Card.Body>
                      <Card.Title>{`C° ${item.main.temp}`} </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(item.dt_txt).toTimeString().split(" ")[0]}
                      </Card.Subtitle>
                      <Card.Text className="text-muted">{new Date(item.dt_txt).toISOString().split("T")[0]}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Gallery;
