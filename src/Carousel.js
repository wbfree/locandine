import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";

function Carousel(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div>
            {props.images.map((src, index) => (
                <img
                    src={src}
                    onClick={() => openImageViewer(index)}
                    width="150"
                    key={index}
                    style={{ margin: "2px" }}
                    alt={props.alts[index]}
                    title={props.alts[index]}
                />
            ))}

            {isViewerOpen && (
                <ImageViewer
                    src={props.images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}
        </div>
    );
}

export default Carousel;
