import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import MascotIcon from '../components/MascotIcon';
import { useApp, CURRENT_USER } from '../context/AppContext';

// 삭제 확인 모달
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.45)' }}
    >
      <div className="bg-white w-full max-w-[340px] rounded-2xl p-6 animate-fade-in"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
      >
        <p className="text-[16px] font-bold text-text-primary text-center mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-11 bg-[#F4F3F1] text-text-secondary rounded-xl text-[15px] font-semibold border-none cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-11 bg-[#FF3B30] text-white rounded-xl text-[15px] font-bold border-none cursor-pointer active:scale-95"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

// 점 세개 메뉴 (수정/삭제)
function ActionMenu({ onEdit, onDelete, align = 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center bg-transparent border-none cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="5" cy="12" r="1.5" fill="#ACACAC" />
          <circle cx="12" cy="12" r="1.5" fill="#ACACAC" />
          <circle cx="19" cy="12" r="1.5" fill="#ACACAC" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className={`absolute z-20 top-full mt-1 bg-white rounded-xl overflow-hidden animate-scale-in ${align === 'right' ? 'right-0' : 'left-0'}`}
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '100px' }}
          >
            {onEdit && (
              <button
                onClick={() => { setOpen(false); onEdit(); }}
                className="w-full px-4 py-3 text-[14px] text-text-primary font-semibold text-left bg-transparent border-none cursor-pointer hover:bg-[#F4F3F1] transition-smooth"
              >
                수정
              </button>
            )}
            <button
              onClick={() => { setOpen(false); onDelete(); }}
              className="w-full px-4 py-3 text-[14px] text-[#FF3B30] font-semibold text-left bg-transparent border-none cursor-pointer hover:bg-[#FFF0F0] transition-smooth"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function BoardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, addComment, editComment, deleteComment, toggleCommentLike, editPost, deletePost } = useApp();
  const post = posts.find((p) => p.id === id) || posts[0];
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  // 게시글 수정 상태
  const [editingPost, setEditingPost] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // 댓글 수정 상태
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  // 삭제 확인 모달
  const [confirmDelete, setConfirmDelete] = useState(null); // { type: 'post'|'comment', commentId? }

  const currentPost = posts.find((p) => p.id === id) || post;
  const isMyPost = currentPost.author === CURRENT_USER;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const text = replyingTo
      ? `@${replyingTo.author} ${commentText.trim()}`
      : commentText.trim();
    addComment(post.id, text);
    setCommentText('');
    setReplyingTo(null);
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment(); }
    if (e.key === 'Escape') setReplyingTo(null);
  };

  // 게시글 수정 시작
  const startEditPost = () => {
    setEditTitle(currentPost.title);
    setEditContent(currentPost.content);
    setEditingPost(true);
  };

  // 게시글 수정 저장
  const saveEditPost = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    editPost(currentPost.id, { title: editTitle.trim(), content: editContent.trim() });
    setEditingPost(false);
  };

  // 게시글 삭제
  const handleDeletePost = () => {
    deletePost(currentPost.id);
    navigate('/board');
  };

  // 댓글 수정 시작
  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.content);
  };

  // 댓글 수정 저장
  const saveEditComment = (commentId) => {
    if (!editCommentText.trim()) return;
    editComment(currentPost.id, commentId, editCommentText.trim());
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const categoryColors = {
    '신입': { bg: '#E8F5E9', text: '#2E7D32' },
    '수료자': { bg: '#F3E5F5', text: '#7B1FA2' },
    '자유': { bg: '#E3F2FD', text: '#1565C0' },
    'Q&A': { bg: '#FFF3E0', text: '#E65100' },
  };

  return (
    <div className="page-container bg-bg">
      <Header title="게시판" />

      <div className="px-4 pt-4 pb-6">
        {/* Post Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
              <MascotIcon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-text-primary">{currentPost.author}</span>
                <span
                  className="text-[12px] font-semibold px-3 py-1.5 rounded-none"
                  style={{
                    backgroundColor: categoryColors[currentPost.category]?.bg || '#E8F0FA',
                    color: categoryColors[currentPost.category]?.text || '#3171C6',
                  }}
                >
                  {currentPost.category}
                </span>
              </div>
              <p className="text-[13px] text-text-secondary mt-0.5">{currentPost.department} · {currentPost.timeAgo}</p>
            </div>
            {/* 내 게시글 메뉴 */}
            {isMyPost && !editingPost && (
              <ActionMenu
                onEdit={startEditPost}
                onDelete={() => setConfirmDelete({ type: 'post' })}
              />
            )}
          </div>

          {/* Title - 수정 모드 */}
          {editingPost ? (
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full h-12 bg-white border border-primary rounded-xl px-4 text-[16px] font-bold text-text-primary"
                style={{ outline: 'none', boxShadow: '0 0 0 3px rgba(49,113,198,0.1)' }}
              />
            </div>
          ) : (
            <h1 className="text-[20px] font-bold text-text-primary leading-relaxed mb-4">
              {currentPost.title}
            </h1>
          )}
        </div>

        {/* Content - 수정 모드 */}
        <div className="card-elevated p-5 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {editingPost ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
                className="w-full bg-[#F8F8F8] border border-primary rounded-xl p-3 text-[15px] text-text-primary resize-none leading-[1.8]"
                style={{ outline: 'none', boxShadow: '0 0 0 3px rgba(49,113,198,0.1)' }}
              />
              <div className="flex gap-2.5 mt-3">
                <button
                  onClick={() => setEditingPost(false)}
                  className="flex-1 h-10 bg-[#F4F3F1] text-text-secondary rounded-xl text-[14px] font-semibold border-none cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={saveEditPost}
                  disabled={!editTitle.trim() || !editContent.trim()}
                  className="flex-1 h-10 gradient-blue text-white rounded-xl text-[14px] font-bold border-none cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  저장
                </button>
              </div>
            </>
          ) : (
            <p className="text-[15.5px] text-text-primary leading-[1.8] whitespace-pre-line">
              {currentPost.content}
            </p>
          )}
          {currentPost.id === 'board001' && !editingPost && (
            <div className="mt-5 w-full h-48 bg-gradient-to-br from-primary-light to-[#D6E8FA] rounded-none flex items-center justify-center">
              <div className="text-center">
                <MascotIcon size={48} />
                <p className="text-[12px] text-primary mt-2 font-medium">첫 출근 기념 📸</p>
              </div>
            </div>
          )}
        </div>

        {/* Like Button */}
        <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-none text-[14.5px] font-semibold cursor-pointer border-none transition-smooth active:scale-90 ${
              liked ? 'bg-[#FFF0F0] text-[#E53935]' : 'bg-white text-text-secondary'
            }`}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C12 21 4 14.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12 4 12 4S12.76 3 14.5 3C17.58 3 20 5.42 20 8.5C20 14.36 12 21 12 21Z"
                fill={liked ? '#E53935' : 'none'}
                stroke={liked ? '#E53935' : '#ACACAC'}
                strokeWidth="1.5"
              />
            </svg>
            <span>좋아요 {likeCount}</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-[15.5px] font-bold text-text-primary mb-3">
            댓글 {currentPost.commentList?.length || 0}
          </h3>

          <div className="space-y-5">
            {currentPost.commentList?.map((comment, index) => {
              const isMyComment = comment.author === CURRENT_USER;
              const isEditing = editingCommentId === comment.id;
              return (
                <div
                  key={comment.id}
                  className="card-elevated p-5 border border-border animate-fade-in"
                  style={{ animationDelay: `${0.25 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                      <MascotIcon size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[14px] font-bold text-text-primary">{comment.author}</span>
                      <span className="text-[12px] text-text-secondary ml-2">{comment.date}</span>
                      {comment.edited && <span className="text-[11px] text-text-secondary ml-1">(수정됨)</span>}
                    </div>
                    {/* 내 댓글 메뉴 */}
                    {isMyComment && !isEditing && (
                      <ActionMenu
                        onEdit={() => startEditComment(comment)}
                        onDelete={() => setConfirmDelete({ type: 'comment', commentId: comment.id })}
                        align="right"
                      />
                    )}
                  </div>

                  {/* 댓글 수정 모드 */}
                  {isEditing ? (
                    <div className="pl-[42px]">
                      <input
                        type="text"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEditComment(comment.id);
                          if (e.key === 'Escape') setEditingCommentId(null);
                        }}
                        autoFocus
                        className="w-full h-10 bg-[#F4F3F1] rounded-xl px-3 text-[14px] text-text-primary border border-primary"
                        style={{ outline: 'none' }}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="text-[12px] text-text-secondary bg-transparent border-none cursor-pointer"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => saveEditComment(comment.id)}
                          className="text-[12px] text-primary font-bold bg-transparent border-none cursor-pointer"
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[14.5px] text-text-primary leading-relaxed pl-[42px]">
                      {comment.content}
                    </p>
                  )}

                  {!isEditing && (
                    <div className="flex items-center gap-3 mt-2 pl-[42px]">
                      <button
                        onClick={() => toggleCommentLike(currentPost.id, comment.id)}
                        className={`text-[12.5px] flex items-center gap-1 bg-transparent border-none cursor-pointer transition-smooth active:scale-90 ${
                          comment.liked ? 'text-[#E53935]' : 'text-text-secondary hover:text-[#E53935]'
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 21C12 21 4 14.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12 4 12 4S12.76 3 14.5 3C17.58 3 20 5.42 20 8.5C20 14.36 12 21 12 21Z"
                            fill={comment.liked ? '#E53935' : '#FFB3B3'}
                            stroke={comment.liked ? '#E53935' : '#FF8A8A'}
                            strokeWidth="1"
                          />
                        </svg>
                        {comment.likes}
                      </button>
                      <button
                        onClick={() => setReplyingTo(replyingTo?.id === comment.id ? null : comment)}
                        className={`text-[12.5px] bg-transparent border-none cursor-pointer transition-smooth ${
                          replyingTo?.id === comment.id ? 'text-primary font-bold' : 'text-text-secondary hover:text-primary'
                        }`}
                      >
                        답글
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reply indicator */}
          {replyingTo && (
            <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-primary-light rounded-none">
              <span className="text-[13px] text-primary font-semibold">@{replyingTo.author}에게 답글</span>
              <button onClick={() => setReplyingTo(null)} className="ml-auto text-primary bg-transparent border-none cursor-pointer text-[12px]">✕</button>
            </div>
          )}

          {/* Comment Input */}
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder={replyingTo ? `@${replyingTo.author}에게 답글...` : '댓글을 입력하세요...'}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleCommentKeyDown}
              className="flex-1 h-[48px] bg-[#EEEDEB] border-none rounded-none px-4 text-[15px] text-text-primary"
              style={{ outline: 'none' }}
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="h-[48px] px-5 gradient-blue text-white rounded-none text-[15px] font-semibold cursor-pointer border-none active:scale-95 transition-smooth disabled:opacity-50"
              style={{ boxShadow: '0 2px 8px rgba(49, 113, 198, 0.3)' }}
            >
              등록
            </button>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {confirmDelete && (
        <ConfirmModal
          message={confirmDelete.type === 'post' ? '게시글을 삭제할까요?\n삭제 후 복구가 불가능합니다.' : '댓글을 삭제할까요?'}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => {
            if (confirmDelete.type === 'post') handleDeletePost();
            else { deleteComment(currentPost.id, confirmDelete.commentId); setConfirmDelete(null); }
          }}
        />
      )}

      <BottomNav />
    </div>
  );
}
