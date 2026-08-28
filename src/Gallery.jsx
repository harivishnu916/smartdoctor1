import React, { useState } from "react";
import "./Gallery.css";

import hospital1 from "./assets/images/hospital1.jpeg";
import hospital2 from "./assets/images/hospital2.jpeg";
import hospital3 from "./assets/images/hospital3.jpeg";
import hospital4 from "./assets/images/hospital4.jpeg";
import hospital5 from "./assets/images/hospital5.jpeg";
import hospital6 from "./assets/images/hospital6.jpeg";
import hospital7 from "./assets/images/hospital7.jpeg";
import hospital8 from "./assets/images/hospital8.jpeg";
import hospital9 from "./assets/images/hospital9.jpeg";


function Gallery() {

    const images = [
        hospital1,
        hospital2,
        hospital3,
        hospital4,
        hospital5,
        hospital6,
        hospital7,
        hospital8,
        hospital9
    ];


    const [selectedImage, setSelectedImage] =
        useState(null);


    function nextImage() {

        setSelectedImage(
            (selectedImage + 1) % images.length
        );
    }


    function previousImage() {

        setSelectedImage(
            (selectedImage - 1 + images.length)
            % images.length
        );
    }


    return (

        <div className="gallery-page">


            {/* HERO */}

            <div className="gallery-header">

                <span className="gallery-tag">
                    ✦ OUR MEDICAL CENTER
                </span>

                <h1>
                    Our Gallery
                </h1>

                <p>
                    Explore PulsePoint Medical Center,
                    our facilities, care environment and
                    patient-focused spaces.
                </p>

            </div>


            {/* GALLERY GRID */}

            <div className="gallery-grid">

                {images.map((image, index) => (

                    <div
                        className={`gallery-card gallery-card-${index + 1}`}
                        key={index}
                        onClick={() =>
                            setSelectedImage(index)
                        }
                    >

                        <img
                            src={image}
                            alt={`PulsePoint Medical Center ${index + 1}`}
                        />


                        <div className="gallery-overlay">

                            <span>
                                View Image
                            </span>

                            <span className="gallery-number">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                        </div>

                    </div>

                ))}

            </div>


            {/* LIGHTBOX */}

            {selectedImage !== null && (

                <div
                    className="lightbox"
                    onClick={() =>
                        setSelectedImage(null)
                    }
                >

                    <button
                        className="lightbox-close"
                        onClick={() =>
                            setSelectedImage(null)
                        }
                    >
                        ✕
                    </button>


                    <button
                        className="lightbox-prev"
                        onClick={(e) => {

                            e.stopPropagation();

                            previousImage();

                        }}
                    >
                        ‹
                    </button>


                    <div
                        className="lightbox-content"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <img
                            src={images[selectedImage]}
                            alt={`PulsePoint ${selectedImage + 1}`}
                        />

                        <div className="lightbox-info">

                            <span>
                                PulsePoint Medical Center
                            </span>

                            <strong>
                                {selectedImage + 1}
                                {" / "}
                                {images.length}
                            </strong>

                        </div>

                    </div>


                    <button
                        className="lightbox-next"
                        onClick={(e) => {

                            e.stopPropagation();

                            nextImage();

                        }}
                    >
                        ›
                    </button>

                </div>

            )}

        </div>
    );
}


export default Gallery;