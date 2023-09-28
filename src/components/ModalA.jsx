import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useInView } from "react-intersection-observer";
import Spinner from "react-bootstrap/Spinner";

const ModalA = (props) => {
  const { ref, inView } = useInView();
  const [url, setUrl] = useState(
    "https://contact.mediusware.com/api/contacts/?page_size=20"
  );
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.next);
        setContacts([...contacts, ...data.results]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.next);
          setContacts([...contacts, ...data.results]);
          setIsLoading(false);
        });
    }
  }, [inView]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All Contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.phone}</td>
                <td>{contact.country.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        ) : null}

        <div ref={ref} style={{ width: "100%", height: "2px" }}></div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setContacts([]);
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalA;
