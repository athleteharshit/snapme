import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { TPins } from "../type/user";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./masonry.layout";
import Spinner from "./spinner";

const Feed = () => {
  const [pins, setPins] = useState<TPins[]>();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  if (!pins?.length) {
    return <h1 className="text-3xl text-center mt-8">No pins available</h1>;
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
