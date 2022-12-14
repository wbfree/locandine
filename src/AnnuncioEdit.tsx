/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useCallback, useEffect } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function useStateApiLazy(path: string, show: boolean) {
    const backendHost = 'https://balinona.synology.me/locandine_backend/'
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

function AnnuncioEdit(props: any) {
    const [show, setShow] = useState<boolean>(false);
    const [edizioni] = useStateApiLazy('api.php?proc=_edizioni_from_idimage(' + props.idimage + ')', show);
    const [idedizione, setIdedizione] = useState<any>(props.idedizione);

    const handleClose = () => setShow(false);
    const url = 'https://balinona.synology.me/locandine_backend/api.php?table=_images&id=' + props.idimage;

    const handleShow = () => {
        setShow(true)
    }

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
    }

    return (
        <>
            {props.idimage > 0 && <Button variant="primary" onClick={handleShow}>Edit</Button>}&nbsp;

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
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AnnuncioEdit;