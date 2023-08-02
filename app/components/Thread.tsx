"use client";
import { RiChatSmile3Line, RiMessage2Line, RiPushpin2Line, RiPushpinFill } from "react-icons/ri";
import { BsFillPinAngleFill } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { AiOutlineBars, AiOutlineCode, AiOutlineLink, AiOutlineOrderedList, AiOutlineUnderline, AiTwotonePushpin } from "react-icons/ai";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAt,
  FaB,
  FaCirclePlus,
  FaCode,
  FaComment,
  FaCommentDots,
  FaCrown,
  FaHandsBubbles,
  FaItalic,
  FaMicrophone,
  FaPaperPlane,
  FaPlus,
  FaRegEye,
  FaRegFaceSmile,
  FaRegMessage,
  FaRegStar,
  FaSquareCheck,
  FaStar,
  FaVideo,
  FaXmark,
} from "react-icons/fa6";
import { Timeline } from "flowbite-react";
let arrMessage = [
  {
    id: 1,
    name: "Kuga",
    role: "admin",
    image: "/images.png",
    time: "12:52 PM",
    message: [
      {
        id: 1,
        content: "hello",
      },
      {
        id: 2,
        content: "how are you?",
      },
    ],
  },
  {
    id: 2,
    name: "Phòng Em",
    role: "user",
    image: "/avata.png",
    time: "12:53 PM",
    message: [
      {
        id: 1,
        content: "im fine and you?",
      },
    ],
  },
  {
    id: 3,
    name: "Kuga",
    role: "admin",
    image: "/images.png",
    time: "12:54 PM",
    message: [
      {
        id: 1,
        content: "im fine and you?",
      },
    ],
  },
];

function Thread({ chilrent }: any) {
  const [imessage, setImessage] = useState({
    indexParent: null,
    index: null,
  });
  const inputRef = useRef<any>(null);
  const [active, setActive] = useState(true);

  function HoverActive(indexParent: any, index: any) {
    setImessage({
      indexParent: indexParent,
      index: index,
    });
  }

  function HoverActiveStatus(indexParent: any, index: any) {
    if (imessage.indexParent === indexParent && imessage.index === index) {
      return "flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md";
    } else {
      return "flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md hidden";
    }
  }

  function sentMessage() {
    let countElement = arrMessage[0].message.length;
    let value = inputRef.current.value;
    arrMessage[0].message.push({
      id: countElement + 1,
      content: value,
    });
    inputRef.current.value = "";
  }

  function CloseThread() {
    if (chilrent === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  }

  return (
    active && (
      <div className="w-3/6 border-l-2 border-slate-800">
        {/* header thread */}
        <div className="h-[8%] flex items-center border-b-2 border-slate-800">
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center gap-2">
              <div className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">
                <FaAngleLeft className="text-white" />
              </div>
              <span className="text-white font-semibold">Thread</span>
              <span className="text-slate-400 text-sm"># proj-datn</span>
            </div>
            <div className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer" onClick={CloseThread}>
              <FaXmark />
            </div>
          </div>
        </div>
        {/* content message */}
        <div className="h-[91%]">
          <div className="overflow-y-scroll max-h-full">
            {/* message replies */}
            <div className="flex items-center gap-1 border-b-2 border-slate-800">
              <div className="w-full grid grid-cols-1 grid-flow-row items-end p-1 m-1">
                <div className="flex items-start space-x-2 m-1">
                  <Image className="rounded mt-2" src="/images.png" alt="logo" width={35} height={35} />
                  <div className="font-medium text-white w-full">
                    <div className="relative inline-flex items-center gap-[1px]">
                      <span className="">Kuga</span>
                    </div>
                    {/* message wrapper */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {/* message */}
                      <div onMouseLeave={() => HoverActive(null, null)} className="relative flex justify-start items-center  hover:bg-slate-600 ease-out duration-200">
                        <div className="relative inline-flex items-center">
                          <span className="text-slate-400">Notifications</span>
                          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-sm text-red-500 -top-2 -right-4 dark:border-gray-900">
                            <BsFillPinAngleFill />
                          </div>
                        </div>
                        <div className="hidden">
                          <FaSquareCheck className="cursor-pointer hover:scale-90 text-green-500" />
                          <FaRegEye className="cursor-pointer hover:scale-90 text-white" />
                          <FaHandsBubbles className="cursor-pointer hover:scale-90 text-yellow-200" />
                          <div className="cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50">
                            <FaRegFaceSmile />
                            <span>React</span>
                          </div>
                          <div className="cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50">
                            <FaRegMessage />
                            <span>Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* user replies */}
            <div className="flex items-center gap-1">
              <div className="w-full grid grid-cols-1 grid-flow-row items-end p-1 m-1">
                {arrMessage.map((item, indexParent) => (
                  <div key={item.id} className="flex items-start space-x-2 m-1">
                    <Image className="rounded mt-1" src={item.image} alt="logo" width={40} height={40} />
                    <div className="font-medium text-white w-full">
                      <div className="relative inline-flex items-center">
                        <div className="relative inline-flex mr-1">
                          <span className="">{item.name}</span>
                          {/* {item.role === "admin" && (
                            <div className="inline-flex items-center justify-center text-xs text-yellow-200 rotate-45 -top-0 -right-2">
                              <FaCrown />
                            </div>
                          )} */}
                        </div>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                      {/* message wrapper */}
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {/* message */}
                        {item.message.map((item, index) => (
                          <div
                            key={item.id}
                            onMouseEnter={() => HoverActive(indexParent, index)}
                            onMouseLeave={() => HoverActive(null, null)}
                            className="relative flex justify-start items-center cursor-pointer hover:bg-slate-600 ease-out duration-200"
                          >
                            <div className="relative inline-flex items-center">
                              <span className="text-slate-400 pt-1 pb-1">{item.content}</span>
                            </div>
                            <div className={HoverActiveStatus(indexParent, index)}>
                              <FaSquareCheck className="cursor-pointer hover:scale-90 text-green-500" />
                              <FaRegEye className="cursor-pointer hover:scale-90 text-white" />
                              <FaHandsBubbles className="cursor-pointer hover:scale-90 text-yellow-200" />
                              <div className="cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50">
                                <FaRegFaceSmile />
                                <span>React</span>
                              </div>
                              <div className="cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50">
                                <FaRegMessage />
                                <span>Reply</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* input */}
            <div className="grid grid-flow-row mt-4 m-4 p-2 bg-slate-600 rounded-lg ring-1 ring-slate-300">
              <div className="flex items-center gap-4 m-2">
                <FaB />
                <FaItalic />
                <AiOutlineUnderline />
                <AiOutlineLink />
                <AiOutlineOrderedList />
                <AiOutlineBars />
                <FaCode />
                <AiOutlineCode />
              </div>
              <textarea ref={inputRef} rows={1} className="p-2 m-2 bg-slate-600 border-none placeholder:text-slate-400 focus:ring-0 text-white" placeholder="Write a message..." />
              <div className="flex items-center justify-between m-2">
                <div className="flex gap-4">
                  <FaCirclePlus />
                  <FaRegFaceSmile />
                  <FaAt />
                  <FaVideo />
                  <FaMicrophone />
                </div>
                <div className="grid grid-flow-col gap-2 p-2 rounded bg-green-500">
                  <div onClick={sentMessage} className="hover:text-yellow-800 cursor-pointer ease-linear duration-200 text-white">
                    <FaPaperPlane />
                  </div>
                  <div className="border-r-2"></div>
                  <div>
                    <FaAngleDown className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Thread;
