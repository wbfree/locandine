import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import AnnuncioEdit from "./AnnuncioEdit";

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

    const idimages = props.edizione.annunci?.map(a => a.idimage)
    const images = props.edizione.annunci?.map(a => a.image_link)
    const alts = props.edizione.annunci?.map(a => `${a.site} ${a.valuta} ${a.prezzo} ${a.data_inizio}`)
    const site = props.edizione.annunci?.map(a => `${a.site}`)
    const price = props.edizione.annunci?.map(a => `${a.valuta} ${a.prezzo}`)

    const divStyle = {
        display: 'inline-block'
    };
    return (
        <div>
            {images?.map((src, index) => (
                <div key={index} style={divStyle}>
                    <img
                        src={src}
                        onClick={() => openImageViewer(index)}
                        width="150"
                        key={index}
                        style={{ margin: "2px" }}
                        alt={alts[index]}
                        title={alts[index]}
                    />
                    <div>{site[index]}</div>
                    <div>{price[index]} - {props.edizione.idedizione}</div>
                    <div><AnnuncioEdit idimage={idimages[index]} idedizione={props.edizione.idedizione} image_link={images[index]} /></div>

                    <div>{/*alts[index]*/}</div>
                </div>

            ))}

            {isViewerOpen && (
                <>
                    <ImageViewer
                        src={images}
                        currentIndex={currentImage}
                        onClose={closeImageViewer}
                        disableScroll={false}
                        backgroundStyle={{
                            backgroundColor: "rgba(0,0,0,0.9)"
                        }}
                        closeOnClickOutside={true}
                    ></ImageViewer>

                </>
            )}
        </div>
    );
}

export default Carousel;
