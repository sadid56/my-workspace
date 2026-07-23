

import BlogForm from "@/components/blogs/BlogForm";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "@/react-query/blogs/actions";

export default function CreateBlogPage() {
  const createBlog = useCreateBlog();
  const navigate = useNavigate();

  return (
    <BlogForm
      submitText='Create Blog'
      onSubmit={async (payload) => {
        await createBlog.mutateAsync(payload);
        navigate("/dashboard/blogs");
      }}
    />
  );
}
