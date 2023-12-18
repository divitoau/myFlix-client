import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";

export const Gallery = ({ movieID }) => {
  const [pics, setPics] = useState([]);
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [bigPicSrc, setBigPicSrc] = useState("");

  const fileInputRef = useRef(null);

  const apiImagesUrl = "http://localhost:8080/images";
  const bucketUrl = "https://silly-lil-bucket-guy.s3.amazonaws.com";

  useEffect(() => {
    try {
      fetch(`${apiImagesUrl}/${movieID}`)
        .then((response) => response.json())
        .then((pics) => {
          if (pics.Contents) {
            const picsMinusFolder = pics.Contents.filter((pic) => pic.Size > 0);
            setPics(picsMinusFolder);
          } else {
            setPics([]);
          }
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const openModal = (key) => {
    const fileName = key.split("/")[2];
    const newBigPicSrc = `${bucketUrl}/original/${movieID}/${fileName}`;
    setModalisOpen(true);
    setBigPicSrc(newBigPicSrc);
  };

  const closeModal = () => {
    setModalisOpen(false);
  };

  const getPicUrl = (key) => `${bucketUrl}/${key}`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("movieID", movieID);
    try {
      const response = await fetch(apiImagesUrl, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h3>Gallery</h3>{" "}
      {pics.length > 0 ? (
        <div id="gallery">
          <Row>
            {pics.map((pic) => (
              <Col
                className="mb-4 px-4"
                key={pic.ETag}
                onClick={() => openModal(pic.Key)}
              >
                <img src={getPicUrl(pic.Key)} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <p>No photos uploaded for this movie yet. Hurry up and be the first!</p>
      )}
      <form
        id="uploader"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="fileInput">Upload a new babe:</label>
        <input
          type="file"
          id="fileInput"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          ref={fileInputRef}
        />
        <Button type="submit">Upload</Button>
      </form>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Button onClick={closeModal}>close</Button>
        <img src={bigPicSrc} className="modal-image"/>
      </Modal>
    </>
  );
};
