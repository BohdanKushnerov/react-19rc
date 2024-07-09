import { Suspense, use, useEffect, useState } from "react";

interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface IPostPromise {
  postPromise: Promise<IPost>;
}

const getUser = (): Promise<IPost | Error> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.co/posts/1")
        .then((data) => data.json())
        .then((result) => res(result))
        .catch((error: Error) => rej(error));
    }, 1000);
  });
};

const PostContainer = ({ postPromise }: IPostPromise) => {
  const postContent = use(postPromise);

  return <div>Here is postPromise title: {postContent.title}</div>;
};

const Post = () => {
  // const [postPromise, setPostPromise] = useState(null);
  // const [show, setShow] = useState(false);
  // function download() {
  //   setPostPromise(getUser());
  //   setShow(true);
  // }

  // if (show) {
  //   return (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <PostContainer postPromise={postPromise} />
  //     </Suspense>
  //   );
  // } else {
  //   return <button onClick={download}>Download post</button>;
  // }
  // ===============================================
  // const [postPromise, setPostPromise] = useState(null);

  // useEffect(() => {
  //   const fn = async () => {
  //     const res = getUser();
  //     console.log(res);
  //     setPostPromise(res);
  //   };

  //   fn();
  // }, []);

  // return (
  //   <>
  //     {postPromise && (
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <PostContainer postPromise={postPromise} />
  //       </Suspense>
  //     )}
  //   </>
  // );
  // ===============================================

  const postPromise = getUser();

  console.log(postPromise);

  return (
    <>
      {typeof postPromise.then === "function" && (
        <Suspense fallback={<div>Loading...</div>}>
          <PostContainer postPromise={postPromise} />
        </Suspense>
      )}
    </>
  );
};

export default Post;
