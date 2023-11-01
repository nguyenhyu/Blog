import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import env from "../../staticEnvVar";
import "./BlogDetail.css";

export default function BlogDetail() {
  const navigate = useNavigate();
  const { blogid } = useParams();
  const [blogDetailState, setBlogDetailState] = useState();
  const [bookmark, setBookmark] = useState(false);
  const [fav, setFavorite] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  var alertStatus = false;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    alertStatus = true;
    console.log("blogid", blogid);
    axios
      .get(`/blog/${blogid}`, {
        headers: {
          authorization: `token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBlogDetailState(res?.data?.blogDetail);
        setFavorite(res?.data?.favOfUser);
        setBookmark(res?.data?.bookMarkOfUser);
      })
      .catch((err) => {
        console.log(err);
        if (alertStatus) {
          alertStatus = false;
          alert("Error: " + err.message);
        }
        navigate("/");
      });
  }, []);
  const reactBlog = (id, type, status) => {
    const userid = localStorage.getItem("userID");
    if (type === env.type_of_react.fav) {
      setFavorite(status);
    }
    if (type === env.type_of_react.bookmark) {
      setBookmark(status);
    }
  };

  // Hàm để hiển thị menu tùy chọn khi nhấp vào biểu tượng ba chấm
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Hàm để hiển thị input trả lời khi nhấn vào "Trả lời"
  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  // Hàm xử lý khi nhấp vào "Xóa bình luận"
  const deleteComment = () => {
    // Thực hiện logic xóa bình luận ở đây
    alert("Bình luận đã bị xóa.");
    // Đóng menu tùy chọn sau khi thực hiện xong
    setShowOptions(false);
  };

  // Hàm xử lý khi nhấp vào "Báo cáo"
  const reportComment = () => {
    // Thực hiện logic báo cáo bình luận ở đây
    alert("Bình luận đã được báo cáo.");
    // Đóng menu tùy chọn sau khi thực hiện xong
    setShowOptions(false);
  };

  const handleOnClick = () => {
    navigate(`/updateBlog/`, { state: { blogid } });
  };

  return (
    <div className="container-fluid row">
      <div className="col-1"></div>
      <div className="col-11">
        <div className="blog-detail row mt-3 d-flex align-items-center">
          <h1 className="blog__title">{blogDetailState?.Title}</h1>
          <div>
            <div className="blog__topic ">{blogDetailState?.topic?.TopicName}</div>
          </div>
          <div className="author-info col-6 d-flex align-items-center">
            {/* Phần avatar và tên tác giả */}
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Author Avatar" className="avatar" />
            <div className="author-name ml-3">
              <p>UserName</p>
              <span>
                <i className="bi bi-pen"></i> {blogDetailState?.userTotalBlog}
              </span>
            </div>
          </div>
          <div className="blog-meta col-6 ">
            {/* Phần thông tin bài viết */}
            <p>Đã đăng vào {blogDetailState?.createdAt}</p>
            <div className="blog_view">
              <p>
                <i className="bi bi-heart-fill"></i> {blogDetailState?.numberOfFav} yêu thích
              </p>
              <p>
                <i className="bi bi-chat-left-text"></i> {blogDetailState?.numberOfBookmark} bình luận
              </p>
              <p>
                <i className="bi bi-bookmark"></i> {blogDetailState?.numberOfComments} lượt lưu
              </p>
            </div>
          </div>
        </div>
        <div className="blog__content row">
          <div className="blogdetail-option col-1">
            <div className="option-column">
              <div className="d-flex justify-content-center">
                {fav ? (
                  <div>
                    <i className="bi-heart-fill" onClick={() => reactBlog(blogid, env.type_of_react.fav, false)}></i>
                  </div>
                ) : (
                  <div>
                    <i className="bi-heart" onClick={() => reactBlog(blogid, env.type_of_react.fav, true)}></i>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center">
                {bookmark ? (
                  <div>
                    <i
                      className="bi bi-bookmark-fill"
                      onClick={() => reactBlog(blogid, env.type_of_react.bookmark, false)}
                    ></i>{" "}
                  </div>
                ) : (
                  <div>
                    <i
                      className="bi bi-bookmark"
                      onClick={() => reactBlog(blogid, env.type_of_react.bookmark, true)}
                    ></i>{" "}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <i className="bi bi-flag-fill" onClick={() => reactBlog(blogid, env.type_of_react.report, null)}></i>
              </div>
            </div>
          </div>
          <div className="col-11">{blogDetailState?.Content}</div>
        </div>
        <div className="blog__comment">
          <h1>Bình luận</h1>
          <div className="avt__author">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Author Avatar"
              className="avatar__comment"
            />
          </div>
          <input className="mt-1" type="area" placeholder="Viết bình luận" />
          <div className="btn_submit">
            <button className="btncmt">Bình luận</button>
          </div>
          <div className="commentUser">
            <div className="row">
              <div className="user_infor col-6 d-flex align-items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User Avatar"
                  className="avatarUser"
                />
                <div className="userName">
                  <p>Username</p>
                  <span>24/4//2023 9:00 Sa</span>
                </div>
              </div>
              <div className="commentAction col-6">
                <i className="fa fa-ellipsis-h" onClick={toggleOptions}></i>
                {showOptions && (
                  <div className="commentOptions">
                    <p onClick={deleteComment}>Xóa bình luận</p>
                    <p onClick={reportComment}>Báo cáo</p>
                  </div>
                )}
              </div>
            </div>
            <div className="commentU">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam dolorem libero debitis tempora vel
                sunt natus quidem officiis architecto ipsum hic quasi consectetur quaerat optio, atque dicta ipsa
                laboriosam labore ea nostrum laudantium ut. Similique voluptatibus sed est earum! Voluptatum!
              </p>
              <div className="reply-btn" onClick={toggleReplyInput}>
                <p>Trả lời</p>
                {showReplyInput && (
                  <div className="reply-section">
                    <input type="text" placeholder="Viết trả lời" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
