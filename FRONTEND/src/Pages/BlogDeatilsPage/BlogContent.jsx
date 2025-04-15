import React from "react";

const BlogContent = ({ block }) => {
  const Quote = ({ quote, caption }) => {
    return (
      <div className="p-3 pl-5 border-1-4 border-purple-600 bg-purple-300 opacity-60">
        <p className="text-xl leading-10 md:text-2xl">{quote}</p>
        {caption?.length ? (
          <p className="w-full text-purple-700 text-base">{caption}</p>
        ) : (
          ""
        )}
      </div>
    );
  };

  if (block.type == "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
  }
  if (block.type == "header") {
    if (block.data.level == 2) {
      return <h2 dangerouslySetInnerHTML={{ __html: block.data.text }}></h2>;
    }
    if (block.data.level == 3) {
      return <h3 dangerouslySetInnerHTML={{ __html: block.data.text }}></h3>;
    }
    if (block.data.level == 4) {
      return <h4 dangerouslySetInnerHTML={{ __html: block.data.text }}></h4>;
    }
    if (block.data.level == 5) {
      return <h5 dangerouslySetInnerHTML={{ __html: block.data.text }}></h5>;
    }
  }
  if (block.type == "quote") {
    return <Quote quote={block.data.text} />;
  }
  if (block.type == "list") {
    console.log(block.data.style);
    return (
      <ol
        className={`pl-5 ${(block.data.styles = "ordered"
          ? "list-decimal"
          : "list-disc")}`}
      >
        {block.data.items.map((item, i) => {
          return (
            <li
              className="my-4"
              dangerouslySetInnerHTML={{ __html: item }}
            ></li>
          );
        })}
      </ol>
    );
  }

  return <div>BlogContent</div>;
};

export default BlogContent;
