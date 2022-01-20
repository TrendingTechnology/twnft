import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Spinner } from "../components/Icons";

interface IEntitiesMentions {
  start: number;
  end: number;
  username: string;
  id: string;
}

interface IEntities {
  mentions?: IEntitiesMentions[];
}

interface IPublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

interface IReferencedTweets {
  type: string;
  id: string;
}

interface ITweetData {
  created_at: Date;
  author_id: string;
  text: string;
  id: string;
  enetities?: IEntities;
  public_metrics: IPublicMetrics;
  referenced_tweets: IReferencedTweets[];
  in_reply_to_user_id?: string;
}

interface ITwitterUser {
  id: string;
  name: string;
  username: string;
  verified: boolean;
  profile_image_url: string;
}

interface ITwitterMedia {
  media_key: string;
  height: number;
  type: string;
  width: number;
  url: string;
  alt_text: string;
}

interface ITweetIncludes {
  users: ITwitterUser[];
  media: ITwitterMedia[];
  tweets: ITweetData[];
}

interface ITweetObject {
  data: ITweetData;
  includes: ITweetIncludes;
}

const MintPage: NextPage = () => {
  const [tweetData, setTweetData] = useState<ITweetObject>();
  return (
    <div>
      <Formik
        initialValues={{ link: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          const tweetRes = await fetch(`api/tweet?tweetUrl=${values.link}`);
          const tweetJSON = await tweetRes.text();
          const tweetObj: ITweetObject = JSON.parse(tweetJSON);
          console.log(tweetObj);
          setTweetData(tweetObj);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="link" />
            <ErrorMessage name="link" />
            <button type="submit" className="text-white bg-black">
              {isSubmitting ? <Spinner /> : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      {tweetData && (
        <div className="flex flex-col w-10/12 h-4/6">
          <div className="flex items-center justify-start col">
            <img
              src={tweetData.includes.users[0].profile_image_url}
              alt={`{Profile picture for ${tweetData.includes.users[0].username}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MintPage;
