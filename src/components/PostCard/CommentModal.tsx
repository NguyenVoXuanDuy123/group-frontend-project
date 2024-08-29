import { fetchApi } from "@/helpers/fetchApi";
import { setToast } from "@/redux/slices/toastSlice";
import { Comment } from "@/types/comment.types";
import { Post } from "@/types/post.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PostCard from ".";
import Modal from "../Common/Modal";
import CommentCard from "./CommentCard";

type Props = {
  open: boolean;
  hideModal: () => void;
  post: Post;
};

const COMMENTS_PER_PAGE = 10;

export default function CommentModal({ open, hideModal, post }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const dispatch = useDispatch();

  const fetchComments = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const lastComment = comments[comments.length - 1];
      const beforeDate = lastComment
        ? lastComment.createdAt
        : new Date().toISOString();

      const response = await fetchApi<Comment[]>(
        `/api/posts/${post.id}/comments?before=${beforeDate}&limit=${COMMENTS_PER_PAGE}`,
        "GET",
        dispatch
      );

      if (!response) {
        dispatch(
          setToast({
            type: "error",
            message: "Failed to fetch comments",
          })
        );
        return;
      }

      if (response.length < COMMENTS_PER_PAGE) {
        setHasMore(false);
      }
      setComments((prevComments) => [...prevComments, ...response]);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, post.id]);

  useEffect(() => {
    if (open) {
      setComments([]);
      setHasMore(true);
      fetchComments();
    }
  }, [fetchComments, open, post.id]);

  const lastCommentElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchComments();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchComments]
  );

  if (!open) return null;

  return (
    <Modal open={open} hideModal={hideModal}>
      <div className="flex-grow overflow-y-auto w-[672px] max-w-2xl">
        <PostCard inCommentModal post={post} />
        {comments.map((comment, index) => (
          <CommentCard
            key={comment.id}
            index={index}
            comment={comment}
            numComments={comments.length}
            lastCommentElementRef={lastCommentElementRef}
          />
        ))}
        {loading && (
          <p className="text-center mt-4">Loading more comments...</p>
        )}
        {!hasMore && (
          <p className="text-center mt-4 text-dark-grey">
            No more comments to load.
          </p>
        )}
      </div>
    </Modal>
  );
}
