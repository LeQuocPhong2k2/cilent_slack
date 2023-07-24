"use client";
import { RiChatSmile3Line, RiMessage2Line, RiPushpin2Line, RiPushpinFill } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { AiOutlineBars, AiOutlineCode, AiOutlineLink, AiOutlineOrderedList, AiOutlineUnderline, AiTwotonePushpin } from "react-icons/ai";
import { FaAngleDown, FaAngleLeft, FaAt, FaB, FaCirclePlus, FaCode, FaHandsBubbles, FaItalic, FaMicrophone, FaPaperPlane, FaPlus, FaRegEye, FaRegFaceSmile, FaRegMessage, FaSquareCheck, FaVideo, FaXmark } from "react-icons/fa6";
import { Timeline } from "flowbite-react";
let arrMessage = [
  {
    id: 1,
    name: "Kuga",
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
    image: "/images.png",
    time: "12:54 PM",
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
    image: "/images.png",
    time: "12:54 PM",
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
    image: "/images.png",
    time: "12:54 PM",
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

function Thread() {
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
    return "hidden col-span-2 border-l-2 border-slate-800";
  }

  return (
    active && (
      <div className="col-span-2 border-l-2 border-slate-800">
        {/* header thread */}
        <div className="flex items-center border-b-2 border-slate-800 h-16">
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center gap-2">
              <div className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">
                <FaAngleLeft className="text-white" />
              </div>
              <span className="text-white font-semibold">Thread</span>
              <span className="text-slate-400 text-sm"># proj-datn</span>
            </div>
            <div className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer" onClick={() => setActive(!active)}>
              <FaXmark />
            </div>
          </div>
        </div>
        {/* message replies */}
        <div className="text-gray-500 font-medium text-sm border-b-2 border-slate-800">
          <div className="flex items-center m-2 p-1 gap-1">
            <RiPushpinFill className="text-xl text-red-500" />
            <div className="flex gap-1 items-center">
              <span className="text-white">Kuga</span>
              <span className="text-xs text-slate-400">12:52 PM</span>
            </div>
            <div className="border-l-2 border-slate-800 flex items-center gap-1">
              <RiMessage2Line className="ml-1 text-white" />
              <span className="">What your name ?</span>
            </div>
            <div className="border-l-2 border-slate-800 flex items-center gap-1">
              <RiChatSmile3Line className="ml-1 text-white" />
              <span className="">2</span>
            </div>
          </div>
        </div>
        {/* content message */}
        <div className="row-span-4 h-96 ml-4">
          <div className="overflow-y-scroll max-h-96">
            <ul className="mt-2 space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
              {arrMessage.map((item, indexParent) => (
                <li className="" key={indexParent}>
                  <div className="grid grid-cols-1 grid-flow-row">
                    <div className="flex gap-2 text-white font-semibold">
                      <Image className="rounded bg-white" src={item.image} alt="logo" width={40} height={40} />
                      <div className="flex gap-1 items-center justify-center">
                        <span>{item.name}</span>
                        <span className="text-xs text-slate-400">{item.time} PM</span>
                      </div>
                    </div>
                    <div className="content pl-12 grid grid-flow-row">
                      {item.message.map((item, index) => (
                        <div key={index} onMouseEnter={() => HoverActive(indexParent, index)} onMouseLeave={() => HoverActive(null, null)} className="relative flex justify-start items-center  hover:bg-slate-600 ease-out duration-200">
                          <span className="imessage p-1 cursor-pointer text-slate-400">{item.content}</span>
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
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* input text */}
        <div className="border-t-2 border-slate-800">
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
    )
  );
}

export default Thread;
