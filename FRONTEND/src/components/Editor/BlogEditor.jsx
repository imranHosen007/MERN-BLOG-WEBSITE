import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import bannerImg from "../../assets/blog banner.png";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import toast from "react-hot-toast";
import embed from "@editorjs/embed";
import list from "@editorjs/list";
import image from "@editorjs/image";
import header from "@editorjs/header";
import quote from "@editorjs/quote";
import EditorJs from "@editorjs/editorjs";
import marker from "@editorjs/marker";
import inlinecode from "@editorjs/inline-code";

const BlogEditor = () => {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState("");
  const [textEditor, setTextEditor] = useState(null);
  const [blog, setBlog] = useState(null);

  const handleBannerChange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBanner(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    setTextEditor(
      new EditorJs({
        holderId: "textEditor",
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
      })
    );
  }, []);

  const handlePublish = () => {
    if (textEditor.isReady) {
      textEditor.save().then(data => {
        if (data.block.length) {
          setBlog({ ...blog });
        }
      });
    }
  };
  return (
    <div>
      <nav className="w-full px-[5vw] py-5 h-[80px] border-b border-gray-200 bg-white flex items-center gap-12 static top-0 !z-50 justify-between">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="">
            <img src={logo} className="w-10" />
          </Link>{" "}
          <p className="hidden w-full text-black md:block">New Blog</p>
        </div>
        <div className="flex items-center gap-x-3">
          <button className="btn !py-2 !text-base" onClick={handlePublish}>
            Publish
          </button>
          <button className="btn !py-2 !text-base !bg-gray-200 !text-black">
            Save Draft
          </button>
        </div>
      </nav>
      <section className="section">
        <div className="mx-auto w-full max-w-[900px]">
          <div className="relative bg-white border-4 border-gray-200 hover:opactiy-80 aspect-video">
            {banner ? (
              <img src={banner} alt="" className="object-cover w-full h-full" />
            ) : (
              <label htmlFor="uploadbanner">
                <img src={bannerImg} alt="" className="z-20 cursor-pointer" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleBannerChange}
                  id="uploadbanner"
                />
              </label>
            )}
          </div>
          <textarea
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full h-20 mt-10 text-4xl font-medium leading-tight outline-none resize-none placeholder:opacity-40"
          ></textarea>

          <div className="text-left" id="textEditor"></div>
        </div>
      </section>
    </div>
  );
};

export default BlogEditor;
