import React from "react";
import { Helmet } from "react-helmet";

const Title = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>MetaBlogs | {title}</title>
      </Helmet>
    </div>
  );
};

export default Title;
