import { Suspense, use, useState } from "react";

interface IMessageContentProps {
  messagePromise: Promise<string>;
}

function fetchMessage(): Promise<string> {
  return new Promise((resolve) => setTimeout(resolve, 1000, "⚛️"));
}

function MessageContent({ messagePromise }: IMessageContentProps) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}

function MessageContainer({ messagePromise }: IMessageContentProps) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <MessageContent messagePromise={messagePromise} />
    </Suspense>
  );
}

function Message() {
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(
    null
  );
  const [show, setShow] = useState(false);

  function download() {
    setMessagePromise(fetchMessage());
    setShow(true);
  }

  if (show && messagePromise !== null) {
    return <MessageContainer messagePromise={messagePromise} />;
  } else {
    return <button onClick={download}>Download message</button>;
  }
}

export default Message;
