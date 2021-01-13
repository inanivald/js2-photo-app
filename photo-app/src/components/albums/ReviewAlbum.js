import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import useAlbum from '../../hooks/useAlbum'
import { Alert, Button, Col, Container, Card, Row } from 'react-bootstrap'
import {SRLWrapper} from "simple-react-lightbox"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { ClipLoader } from 'react-spinners'
import moment from 'moment'

const ReviewAlbum = () => {
    const [likedImages, setLikedImages] = useState([]);
    const [reviewedImages, setReviewedImages] = useState([]);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const { albumId } = useParams();
    const navigate = useNavigate();
    const {album, images, loading} = useAlbum(albumId);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getImages() {
            const imageList = await Promise.all(
                images.map(image => {
                    return {
                        id: image.id, 
                        like: undefined
                    }
                })
            )
            setReviewedImages(imageList);
        }
        getImages();
    }, [images]);

    useEffect(() => {
        let likedArray = reviewedImages.filter(image => {
            return image.like === true
        });
        setLikedImages(likedArray);

        let result = reviewedImages.every(image => image.like !== undefined);
        if (result === false) {
            setDisabledBtn(true);
            return;
        } else if (result === true) {
            setDisabledBtn(false);
        }
    }, [reviewedImages])

    const updateImage = (image, reaction) => {

        let updatedArray = reviewedImages.map(item => {
            if (item.id === image.id) {
                return {
                    id: item.id,
                    like: reaction,
                    name: image.name,
				    size: image.size,
				    type: image.type,
                    url: image.url,
                }
            } else {
                return item;
            }
        })
        setReviewedImages(updatedArray);
        toggleThumbs(image.id, reaction);
    }

    const handleSendReview = async () => {
        const title = `${album.title} - ${moment().format("MMMM Do YYYY, h:mm:ss a")}`;

        setError(false);

        try {
           const docRef = await db.collection('albums').add({
                title,
                owner: album.owner
            });
            
            await likedImages.forEach(likedImage => {

                if (albumId) {
                    likedImage.album = db.collection('albums').doc(docRef.id)
                    likedImage.owner = album.owner
                }
              db.collection('images').add(likedImage)
        })

            navigate('/review/thanks');
        } catch (err) {
            setError(err.message);
        }
    }

    const toggleThumbs = (id, reaction) => {
        let card = document.getElementById(id);
        if (reaction === true) {
            card.getElementsByClassName('thumbs-up')[0].classList.add('thumb-active');
            card.getElementsByClassName('thumbs-down')[0].classList.remove('thumb-active');
        } else if (reaction === false) {
            card.getElementsByClassName('thumbs-down')[0].classList.add('thumb-active');
            card.getElementsByClassName('thumbs-up')[0].classList.remove('thumb-active');
        }
    }

    return (
        <Container fluid className="px-4">
            <h2 className="text-center">You are currently reviewing {album && album.title}</h2>

            <SRLWrapper>
                <Row className="justify-content-md-center">
                    {loading
                        ? (<ClipLoader/>)
                        
                        : (
                            images.map(image => (
                                <Col xs={12} sm={6} md={4} lg={3} key={image.id}>
                                    <Card>
                                        <a href={image.url} >
                                            <Card.Img variant="top" src={image.url} />
                                        </a>
                                        <Card.Body className="d-flex justify-content-between" id={image.id}>
                                            <button 
                                                style={{ border: "none", backgroundColor: "transparent" }} 
                                                className="thumbs-up"
                                                onClick={() => updateImage(image, true)} >
                                                    <FontAwesomeIcon 
                                                        icon={faThumbsUp}
                                                        style={{ fontSize: "1.5em", margin: "0 0.5em" }} 
                                                        />
                                            </button>

                                            <button 
                                                style={{ border: "none", backgroundColor: "transparent" }} 
                                                className="thumbs-down"
                                                onClick={() => updateImage(image, false)} >
                                                    <FontAwesomeIcon 
                                                        icon={faThumbsDown} 
                                                        style={{ fontSize: "1.5em", margin: "0 0.5em"}} 
                                                        />
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )  
                    }
                </Row>
            </SRLWrapper>

            {
                reviewedImages && likedImages.length > 0 && (
                    <div className="text-center mt-3">
                        <p>Liked Images: {likedImages.length} / {images.length}</p>
                        <div className="d-flex justify-content-center">
                            <Button 
                                disabled={disabledBtn} 
                                variant="dark" 
                                className="mr-3" 
                                onClick={handleSendReview}>
                                    Send Review
                            </Button>
                        </div>
                        {
                            error && (
                                <Alert variant="danger">{error}</Alert>
                            )
                        }
                    </div>
                )
            }
        </Container>
    )
}

export default ReviewAlbum