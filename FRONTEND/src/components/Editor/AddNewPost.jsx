import React, { useContext, useEffect, useRef, useState } from "react";
import bannerImg from "../../assets/blog banner.png";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import embed from "@editorjs/embed";
import list from "@editorjs/list";
import { Loader2 } from "lucide-react";
import header from "@editorjs/header";
import quote from "@editorjs/quote";
import EditorJs from "@editorjs/editorjs";
import marker from "@editorjs/marker";
import inlinecode from "@editorjs/inline-code";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
const AddNewPost = () => {
  const axiosPublic = useAxiosPublic();
  let editorRef = useRef();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [tags, setTags] = useState([]);
  const [meta, setMeta] = useState("");
  const navigate = useNavigate();
  const tagLimit = 10;
  const handleBannerChange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBanner(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleTagChange = e => {
    if (meta != "") {
      if (e.key === "Enter") {
        if (tags.length < 10) {
          if (tags.includes(meta)) {
            return toast.error("Same Tag Not Allowed");
          }
          setTags([...tags, meta]);
          setMeta("");
        } else {
          return toast.error(`You can add max ${tagLimit} tags`);
        }
      }
    }
  };
  const handleTagClick = e => {
    if (meta != "") {
      if (e.key === "Enter") {
        if (tags.length < 10) {
          if (tags.includes(meta)) {
            return toast.error("Same Tag Not Allowed");
          }
          setTags([...tags, meta]);
          setMeta("");
        } else {
          return toast.error(`You can add max ${tagLimit} tags`);
        }
      }
    }
  };
  const handleTagDelete = tag => {
    const updatedTag = tags.filter(tagg => {
      return tagg !== tag;
    });
    setTags(updatedTag);
  };

  // -----Handle-Submit-Publish----
  const handlePublish = async e => {
    setButtonLoading(true);
    e.preventDefault();
    const content = await editorRef.current.save();
    const newPost = {
      title,
      description,
      banner,
      category,
      tags,
      draft: false,
      content: content.blocks,
    };
    axiosPublic
      .post(`/blog`, newPost, { withCredentials: true })
      .then(res => {
        if (res.data?.success) {
          toast.success(`Blog Pulishing SuccesFull!`);
          navigate("/");
          setButtonLoading(false);
        }
      })
      .catch(error => {
        setButtonLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };
  // ---handle-Save-Darft--
  const handleSaveDraf = async e => {
    setButtonLoading(true);
    e.preventDefault();
    const content = await editorRef.current.save();

    const newPost = {
      title,
      description,
      banner,
      category,
      tags,
      draft: true,
      content: content.blocks,
    };
    axiosPublic
      .post(`/blog`, newPost, { withCredentials: true })
      .then(res => {
        if (res.data?.success) {
          toast.success(`Blog Draft SuccesFull!`);
          navigate("/");
          setButtonLoading(false);
        }
      })
      .catch(error => {
        setButtonLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    const editor = new EditorJs({
      holder: "textEditor",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      data: "",
      tools: {
        embed: embed,
        list: { class: list, inlineToolbar: true },
        header: {
          class: header,
          config: {
            placeholder: "Type Heading...",
            levels: [2, 3, 4, 5, 6],
            default: 2,
          },
        },
        quote: {
          class: quote,
          inlineToolbar: true,
        },
        marker,
        inlinecode,
      },
      placeholder: "Lets Write an Awsome Story!",
    });
    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <div>
      <div className="section">
        <form className="pt-8 space-y-5" aria-required="true">
          <div>
            <div className="mx-auto w-full max-w-[1200px]">
              <label htmlFor="title" className="text-xl font-semibold ">
                Blog Title:
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                type="text "
                id="title"
                placeholder="Blog Title"
                className="w-full px-4 py-3 my-4 text-2xl font-medium leading-tight bg-gray-200 outline-none resize-none placeholder:opacity-40"
              />
              <div className="relative bg-white border-4 border-gray-200 hover:opactiy-80 aspect-video">
                {banner ? (
                  <img
                    src={banner}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <label htmlFor="uploadbanner">
                    <img
                      src={bannerImg}
                      alt=""
                      className="z-20 cursor-pointer"
                    />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleBannerChange}
                      id="uploadbanner"
                    />
                  </label>
                )}
              </div>

              <div className="flex flex-col justify-between gap-4 md:flex-row">
                {/* ----left-side--- */}
                <div className="w-full md:w-2/3">
                  <p className="mt-3 mb-5 text-xl font-semibold">
                    Content Section
                  </p>

                  <div className="text-left" id="textEditor"></div>
                </div>
                {/* ----Right-Side---- */}
                <div className="w-full p-5 space-y-5 md:w-1/3">
                  <label htmlFor="Description" className="text-xl">
                    Description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    id="Description"
                    placeholder="Write Blog Description"
                    className="w-full h-40 px-4 text-xl font-medium leading-tight bg-gray-200 outline-none resize-none placeholder:opacity-40"
                  ></textarea>
                  <label
                    htmlFor="category"
                    className="text-base font-semibold "
                  >
                    Blog Category:
                  </label>
                  <input
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                    type="text "
                    id="category"
                    placeholder="Blog Category"
                    className="w-full py-2 text-base !mb-2  leading-tight outline-none resize-none placeholder:opacity-40 !mt-2 bg-gray-200 px-4"
                  />
                  <label htmlFor="tags" className="text-base font-semibold ">
                    Blog Tags:
                  </label>
                  <div>
                    {" "}
                    <input
                      onKeyDown={handleTagChange}
                      onClick={handleTagClick}
                      value={meta}
                      onChange={e => setMeta(e.target.value)}
                      type="text "
                      id="tags"
                      placeholder="Write Blog Tags"
                      className="w-full py-2 text-base  leading-tight outline-none resize-none placeholder:opacity-40 !mb-0 bg-gray-200 px-4"
                    />{" "}
                    {tags && tags.length != 0 && (
                      <div className="flex flex-wrap items-center w-full p-1 mt-3 bg-slate-400 ">
                        {tags.map(tag => {
                          return (
                            <div
                              key={tag}
                              className="bg-white m-1 !mt-0 flex items-center rouned-full pr-4 hover:bg-opacity-90 "
                            >
                              <p className="p-1 mr-4">{tag}</p>
                              <button
                                type="button"
                                onClick={() => handleTagDelete(tag)}
                              >
                                <RxCross1 size={20} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <p className="w-full mt-1 text-right">
                      {tagLimit - tags.length} Tag Left
                    </p>
                  </div>
                  <label htmlFor="atuhor" className="text-base font-semibold ">
                    Author
                  </label>
                  <input
                    disabled
                    value={user?.personal_info?.username}
                    type="text "
                    id="atuhor"
                    className="w-full py-2 text-base !mb-2  leading-tight outline-none resize-none placeholder:opacity-40 !mt-2 bg-gray-200 px-4"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                {buttonLoading ? (
                  <button
                    type="button"
                    className="flex items-center justify-center w-full py-3 font-medium text-white bg-black rounded-md hover:bg-indigo-500"
                  >
                    Please wait
                    <span>
                      <Loader2 className="w-4 h-4 ml-4 animate-spin" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={buttonLoading}
                    className="w-full py-3 font-medium text-white bg-black rounded-md hover:bg-indigo-500"
                  >
                    Publish
                  </button>
                )}
                {buttonLoading ? (
                  <button
                    type="button"
                    className="flex items-center justify-center w-full py-3 font-medium text-white bg-black rounded-md hover:bg-indigo-500"
                  >
                    Please wait
                    <span>
                      <Loader2 className="w-4 h-4 ml-4 animate-spin" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={buttonLoading}
                    onClick={handleSaveDraf}
                    className="w-full py-3 font-medium text-white bg-black rounded-md hover:bg-indigo-500"
                  >
                    Save Draft
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPost;
