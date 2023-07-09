import { useContext, useEffect, useState } from "react";
import TextAdd from "./TextAdd";
import { Avatar } from "@mui/material";
import userLoggedContest from "./UserLoggedContest";

function CommentPage({ postId }) {
  const [comment, setComment] = useState("");
  const [commentList, SetCommentList] = useState([]);
  const [sent, setSent] = useState(false);
  const { avatar, avatarColor, username } = useContext(userLoggedContest);

  let riceviState = (text) => {
    setComment(text);
  };

  useEffect(() => {
    fetch("http://localhost:3001/comments/commentlist", {
      method: "POST",
      body: JSON.stringify({ postId: `${postId}` }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      // .then((json) => console.log(json.commentPost));
      .then((json) => SetCommentList(json.commentPost));
  }, []);

  let handlePostComment = () => {
    SetCommentList([
      ...commentList,
      {
        user: username,
        avatar: avatar,
        avatarColor: avatarColor,
        text: comment,
      },
    ]);
    setComment("");
    setSent(true);
    fetch("http://localhost:3001/comments/commentpush", {
      method: "POST",
      body: JSON.stringify({
        postId: `${postId}`,
        user: username,
        avatar: avatar,
        avatarColor: avatarColor,
        text: comment,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then(console.log);
  };

  return (
    <div className="relative w-screen">
      <div className="flex flex-col gap-5 w-full min-h-12 max-h-52 overflow-x-scroll ">
        {commentList.map((el, i) => (
          <div key={i} className="flex gap-5">
            <Avatar
              sx={{ width: 40, height: 40, bgcolor: `${el.avatarColor}` }}
            >
              {el.avatar}
            </Avatar>
            <p className="bg-secondary rounded-xl ">{el.text}</p>
          </div>
        ))}
      </div>
      <div className=" w-screen flex flex-col">
        <TextAdd passaState={riceviState} sentComment={{ sent, setSent }} />
        {/* <div className="flex gap-5 items-center justify-center">
          <Avatar sx={{ width: 40, height: 40, bgcolor: "blue" }}>FF</Avatar>
          <h1>Francesco Francomollo</h1>
        </div> */}
      </div>

      <button
        onClick={handlePostComment}
        className=" bg-primary rounded-full w-screen h-10"
      >
        Invia commento
      </button>
    </div>
  );
}
export default CommentPage;
