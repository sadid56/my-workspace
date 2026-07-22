import React, { Suspense } from "react";
import EditBlog from "./EditBlog";
import { useParams } from "react-router-dom";

const EditBlogPage = () => {
  const { id } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlog id={id!} />
    </Suspense>
  );
};

export default EditBlogPage;
