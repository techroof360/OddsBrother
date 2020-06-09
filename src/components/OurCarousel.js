import React, { useState, useEffect } from "react";
import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";
import { UncontrolledCarousel } from "reactstrap";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import PropTypes from "prop-types";

const OurCarousel = () => {
  const [items, setItems] = useState([]);

  var imagesPath;

  useEffect(() => {
    axios.get(apiEndpoints.BANNER_API).then(res1 => {
      axios.get(apiEndpoints.IMAGES_PATH).then(res2 => {
        imagesPath = res2.data;

        const slides = res1.data._embedded.banners.map(item => {
          return {
            src: imagesPath + item.imageName,
            altText: item.imageName,
            caption: ""
          };
        });

        setItems(slides);
      });
    });
  }, []);

  return <UncontrolledCarousel className="carousel" items={items} />;
};
OurCarousel.propTypes = {
  onChange: PropTypes.func
};
export default OurCarousel;
