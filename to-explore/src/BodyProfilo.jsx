import { Navbar } from "./Navbar";
import { useContext, useEffect, useState } from "react";
import Card2 from "./Card2";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { useParams } from "react-router-dom";
import userLoggedContest from "./UserLoggedContest";

function BodyProfilo(props) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [publication, setPublication] = useState({});
  let regionSelected = useParams();
  let { username } = useContext(userLoggedContest);
  let arrayFetch;
  if (regionSelected.region) {
    arrayFetch = `region/${regionSelected.region}`;
  } else if (props.username) {
    arrayFetch = `username/${props.username}`;
  } else {
    arrayFetch = `username/${username}`;
  }

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${arrayFetch}`)
      .then((res) => res.json())
      .then((json) => setFiltered(json));
    props.passastate(filtered.length);
  }, [arrayFetch, props, filtered]);

  const handleOpen = (evt) => {
    const found = filtered.findIndex((el) => evt.target.id === el.id);
    setPublication(found >= 0 && filtered[found]);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <div className="bg-contrast bg-blur bg-opacity-40 min-h-[720px] h-full md:min-h-[1050px]">
      <Navbar />
      <div className="flex flex-wrap w-full">
        {!filtered.length && (
          <h1 className="m-auto text-xl my-56">Non ci sono contenuti</h1>
        )}

        {/* {if(windowWidth ) } */}

        {filtered.map((el, i) => (
          <img
            key={i}
            id={el.id}
            src={el.img}
            alt="img"
            className="w-1/3 h-40 cursor-pointer object-cover"
            onClick={handleOpen}
          />
        ))}
        {/* {filtered.map((el, i) => (
          <Card2
            key={i}
            postDescription={el.description}
            postLocation={el.location}
            postImg={el.img}
            postDate={el.postData}
            postAvatar={el.postAvatar}
            avatarColor={el.avatarColor}
            postId={el.id}
          />
        ))} */}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className="w-screen h-screen flex justify-center items-center">
          <Card2
            postDescription={publication.description}
            postImg={publication.img}
            postAvatar={publication.postAvatar}
            postId={publication.id}
            postDate={publication.postData}
            postLocation={publication.location}
            avatarColor={publication.avatarColor}
            postUser={publication.postUser}
          />
        </div>
      </Modal>
    </div>
  );
}

export default BodyProfilo;
