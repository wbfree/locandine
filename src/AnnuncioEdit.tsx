/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRef, useState, useCallback, useEffect } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ReactCrop, { type Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const backendHost = 'https://balinona.synology.me/locandine_backend/'

function useStateApiLazy(path: string, show: boolean) {
    const [item, setItem] = useState<any>([]);

    const fetchItems = useCallback(() => {
        if (show)
            fetch(backendHost + path)
                .then(response => response.json())
                .then(data => setItem(data));
    }, [show])

    useEffect(() => {
        fetchItems();
    }, [show])

    return [item, fetchItems]
}

function ImageEdit(props: any) {
    const [crop, setCrop] = useState<Crop>()
    useEffect(() => {
        props.setCropSelection(undefined)
    }, [])

    const imageRef = useRef<HTMLImageElement>(null)

    return (
        <>
            <ReactCrop
                crop={crop}
                onChange={crop => setCrop(crop)}
                onComplete={(crop: PixelCrop, percentCrop: PercentCrop) => props.setCropSelection(percentCrop)}>

                <img ref={imageRef} src={props.imageSrc} />
            </ReactCrop>
        </>
    )

}

function AnnuncioEdit(props: any) {
    const [show, setShow] = useState<boolean>(false);
    const [edizioni] = useStateApiLazy('api.php?proc=_edizioni_from_idimage(' + props.idimage + ')', show);
    const [idedizione, setIdedizione] = useState<any>(props.idedizione);

    const [cropSelecion, setCropSelection] = useState<Crop>()

    const url = 'https://balinona.synology.me/locandine_backend/api.php?table=_images&id=' + props.idimage;

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        // Simple POST request with a JSON body using fetch
        setShow(false);
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idimage: props.idimage, idedizione: idedizione })
        };
        fetch(url, postOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        if (cropSelecion)
            handleSubmitCrop(cropSelecion);

    }

    const handleDelete = () => {
        // Simple POST request with a JSON body using fetch
        if (window.confirm("Confermi cancellazione?")) {
            //Logic to delete the item
            setShow(false);
            const postOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(url, postOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }

    }

    const handleSubmitCrop = (percentCrop: any) => {
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ crop: percentCrop })
        };
        fetch(backendHost + '/api.php?crop=' + props.idimage, postOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    };

    return (
        <>
            {props.idimage > 0 &&
                <Button variant="primary" onClick={handleShow}>Edit</Button>
            }&nbsp;

            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit edizione</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Edizioni</Form.Label>
                            <Form.Control as="select" value={idedizione} onChange={(event) => { setIdedizione(event.target.value) }}>
                                {edizioni && edizioni.map((edizione: any, index: any) =>
                                    (<option key={index} value={edizione.idedizione}>{edizione.tipo} {edizione.versione} {edizione.tipografica ?? ''}</option>))
                                }
                            </Form.Control>
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="idedizione" defaultValue={idedizione} onChange={(event) => { setIdedizione(event.target.value) }} />

                        </Form.Group>
                    </Form>
                    <ImageEdit imageSrc={props.image_link} setCropSelection={setCropSelection} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AnnuncioEdit;