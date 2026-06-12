import { createContext, useContext, useState } from 'react';
import { boardPosts, qnaItems, todoItems } from '../data/mockData';

const AppContext = createContext(null);
export { AppContext };

// 현재 로그인 사용자 (mockData 기반)
export const CURRENT_USER = '김서연';

export function AppProvider({ children }) {
  const [posts, setPosts] = useState(boardPosts);
  const [qnas, setQnas] = useState(qnaItems);
  const [todos, setTodos] = useState(todoItems);

  // ─── 게시글 추가 ───────────────────────────────
  const addPost = (newPost) => {
    const post = {
      ...newPost,
      id: `board${Date.now()}`,
      likes: 0,
      comments: 0,
      timeAgo: '방금 전',
      isHot: false,
      commentList: [],
    };
    setPosts((prev) => [post, ...prev]);
    return post.id;
  };

  // ─── 게시글 수정 ───────────────────────────────
  const editPost = (postId, updated) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ...updated } : p))
    );
  };

  // ─── 게시글 삭제 ───────────────────────────────
  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  // ─── 댓글 추가 ─────────────────────────────────
  const addComment = (postId, commentContent) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const newComment = {
          id: `c${Date.now()}`,
          author: CURRENT_USER,
          department: '운영지원과',
          content: commentContent,
          date: '방금 전',
          likes: 0,
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentList: [...(post.commentList || []), newComment],
        };
      })
    );
  };

  // ─── 댓글 수정 ─────────────────────────────────
  const editComment = (postId, commentId, newContent) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          commentList: (post.commentList || []).map((c) =>
            c.id === commentId ? { ...c, content: newContent, edited: true } : c
          ),
        };
      })
    );
  };

  // ─── 댓글 삭제 ─────────────────────────────────
  const deleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: Math.max(0, post.comments - 1),
          commentList: (post.commentList || []).filter((c) => c.id !== commentId),
        };
      })
    );
  };

  // ─── 댓글 좋아요 토글 ──────────────────────────
  const toggleCommentLike = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          commentList: (post.commentList || []).map((c) =>
            c.id === commentId
              ? { ...c, likes: (c.liked ? c.likes - 1 : c.likes + 1), liked: !c.liked }
              : c
          ),
        };
      })
    );
  };

  // ─── QnA 질문 추가 ─────────────────────────────
  const addQna = (newQna) => {
    const qna = {
      ...newQna,
      id: `qna${Date.now()}`,
      answer: '아직 답변이 없습니다. 선배 인턴의 답변을 기다려주세요!',
      tip: '',
      author: {
        name: newQna.name || CURRENT_USER,
        role: '청년인턴',
        avatar: null,
      },
      keyTip: '',
    };
    setQnas((prev) => [qna, ...prev]);
    return qna.id;
  };

  // ─── QnA 질문 삭제 ─────────────────────────────
  const deleteQna = (qnaId) => {
    setQnas((prev) => prev.filter((q) => q.id !== qnaId));
  };

  // ─── Todo 토글 ─────────────────────────────────
  const toggleTodo = (taskId) => {
    setTodos((prev) =>
      prev.map((dayTasks) => ({
        ...dayTasks,
        tasks: dayTasks.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        ),
      }))
    );
  };

  // ─── Todo 추가 ─────────────────────────────────
  const addTodo = (dateStr, newTask) => {
    setTodos((prev) => {
      const existingDay = prev.find((d) => d.date === dateStr);
      const task = {
        id: `todo${Date.now()}`,
        title: newTask.title,
        time: newTask.time || '',
        completed: false,
      };
      if (existingDay) {
        return prev.map((d) =>
          d.date === dateStr ? { ...d, tasks: [...d.tasks, task] } : d
        );
      } else {
        return [...prev, { date: dateStr, tasks: [task] }];
      }
    });
  };

  // ─── Todo 수정 ─────────────────────────────────
  const editTodo = (taskId, updatedFields) => {
    setTodos((prev) =>
      prev.map((dayTasks) => ({
        ...dayTasks,
        tasks: dayTasks.tasks.map((t) =>
          t.id === taskId ? { ...t, ...updatedFields } : t
        ),
      }))
    );
  };

  // ─── Todo 삭제 ─────────────────────────────────
  const deleteTodo = (taskId) => {
    setTodos((prev) =>
      prev.map((dayTasks) => ({
        ...dayTasks,
        tasks: dayTasks.tasks.filter((t) => t.id !== taskId),
      })).filter((dayTasks) => dayTasks.tasks.length > 0)
    );
  };

  return (
    <AppContext.Provider
      value={{
        posts, qnas, todos,
        addPost, editPost, deletePost,
        addComment, editComment, deleteComment, toggleCommentLike,
        addQna, deleteQna,
        toggleTodo, addTodo, editTodo, deleteTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
