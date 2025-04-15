import React from "react";
import { useParams } from "react-router-dom";
import AddNewPost from "../../components/Editor/AddNewPost";
import EditPost from "../../components/Editor/EditPost";

const PostEditorPage = () => {
  const { id } = useParams();

  return (
    <div>
      <EditPost />
    </div>
  );
};

export default PostEditorPage;
