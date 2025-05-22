import { Link, useParams } from "react-router-dom";
import Header from "../../utils/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../../utils/hooks/UseAuth";
import toast from "react-hot-toast";

const Details = () => {
  const { user } = UseAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const fetchSingleBlog = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/single-blog/${id}`
    );
    return data;
  };

  const { data: singleBlog, isLoading } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: fetchSingleBlog,
  });
  const { title, image, category, shortDescription, longDescription, author } =
    singleBlog || {};

  const fetchComments = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/comment/${id}`
    );
    return data;
  };

  // get comment by blog id

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  // post comment
  const { mutateAsync: postComment, isPending } = useMutation({
    mutationFn: async (commentData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post-comment`,
        commentData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Comment Posted");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (!comment) return;
    const commentData = {
      blogId: id,
      author: user?.displayName,
      authorImage: user?.photoURL,
      comment,
    };
    await postComment(commentData);

    // Clear textarea on submit; save function to be implemented later
  };

  if (isLoading) return <h1>loading....</h1>;

  return (
    <div className="py-10">
      <div>
        <Header
          heading={"Comprehensive Blog Overview"}
          subheading={
            "Get all the details, tips, and insights packed into this blog — enjoy the read!"
          }
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {image && (
            <div className="overflow-hidden rounded-lg shadow-md mb-8">
              <img
                src={image}
                alt={title}
                className="w-full h-64 sm:h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
            <span className="inline-block text-center bg-gray-900 text-white text-sm font-semibold px-4 py-1 rounded-full">
              {category}
            </span>
          </header>

          {author && (
            <p className="text-sm text-gray-500 italic mb-6">
              Written by{" "}
              <span className="font-medium">{author?.authorName}</span>
            </p>
          )}

          {shortDescription && (
            <p className="text-gray-700 text-lg mb-8 border-l-4 border-gray-300 pl-4 italic">
              {shortDescription}
            </p>
          )}

          {longDescription && (
            <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-10">
              {longDescription}
            </article>
          )}

          {user?.email === author?.authorEmail ? (
            <Link to={`/update/${id}`}>
              <button className="cursor-pointer mt-5 bg-black hover:bg-white text-white font-semibold py-2 px-6 hover:text-black border hover:border-black rounded-md transition">
                Update Blog
              </button>
            </Link>
          ) : (
            ""
          )}

          {/* Comment Section */}
          {user?.email === author?.authorEmail ? (
            ""
          ) : (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>

              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  rows={4}
                  placeholder="Write your comment here..."
                  name="comment"
                ></textarea>
                <button
                  type="submit"
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
                >
                  {isPending ? "Loading..." : "Submit Comment"}
                </button>
              </form>
            </section>
          )}
          {/* Comment List */}
          <div className="flex justify-center">
            <h1>------comments------</h1>
          </div>
          <div className="mt-10 space-y-6 bg-gray-100 p-5 rounded-md max-h-96 overflow-y-auto">
            {comments?.length === 0 && (
              <p className="text-gray-500 italic">
                No comments yet. Be the first to comment!
              </p>
            )}
            {comments?.map((comment) => (
              <div
                key={comment?._id}
                className="bg-gray-50 flex flex-col gap-2 p-4 rounded-md shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-5 rounded-full ring ring-gray-300 ring-offset-2">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500  italic">
                    {comment?.author}
                  </p>
                </div>
                <p className="text-gray-800">{comment?.comment}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Details;
