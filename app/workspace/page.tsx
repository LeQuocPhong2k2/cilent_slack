"use client";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { BiMicrophone, BiVideo } from "react-icons/bi";
import { Timeline } from "flowbite-react";
import io from "socket.io-client";
import { PiMicrophoneLight, PiVideoCameraLight } from "react-icons/pi";
import { AiOutlineBars, AiOutlineCode, AiOutlineLink, AiOutlineOrderedList, AiOutlineUnderline } from "react-icons/ai";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAt,
  FaB,
  FaBars,
  FaCaretDown,
  FaCaretRight,
  FaChevronDown,
  FaCircle,
  FaCirclePlus,
  FaCode,
  FaCreativeCommonsBy,
  FaEllipsis,
  FaEllipsisVertical,
  FaFaceSmileBeam,
  FaHandsBubbles,
  FaHeadphones,
  FaItalic,
  FaMagnifyingGlass,
  FaMicrophone,
  FaPaperPlane,
  FaPenToSquare,
  FaPencil,
  FaPlus,
  FaRegEye,
  FaRegFaceSmile,
  FaRegFile,
  FaRegMessage,
  FaRegSquarePlus,
  FaSliders,
  FaSquareCheck,
  FaVideo,
  FaXmark,
} from "react-icons/fa6";
import { RiAddLine, RiChatSmile3Line, RiMessage2Line, RiPushpinFill } from "react-icons/ri";
import { BsFillPinAngleFill } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

let arruser = [
  {
    id: 1,
    name: "Kuga",
    image: "/images.png",
  },
  {
    id: 2,
    name: "Phòng Em",
    image: "/avata.png",
  },
];

let arrmessage = [
  {
    id: 1,
    userid: 1,
    content: "Hello",
    times: "10:00 AM",
    comment: [
      {
        id: 1,
        userid: 2,
        times: "10:01 AM",
        comment: "xin chào Kuga",
      },
      {
        id: 2,
        userid: 1,
        times: "10:02 AM",
        comment: "xin chào Phòng Em",
      },
    ],
  },
  {
    id: 2,
    userid: 2,
    content: "How are you?",
    times: "10:30 AM",
    comment: [
      {
        id: 1,
        userid: 1,
        times: "10:31 AM",
        comment: "I'm fine",
      },
    ],
  },
];

let socket: any;

function App() {
  const [showMenuChannel, setShowMenuChannel] = useState(false);
  const [showDirectMessage, setShowDirectMessage] = useState(false);
  const [showToolsMessage, setShowToolMessage] = useState({
    index: -1,
    options: "",
  });
  const inputMessageRef = useRef<any>(null);
  const [showThread, setShowThread] = useState({
    status: false,
    idMessageReplie: 0,
  });
  const [hoverSentMessage, setHoverSentMessage] = useState({
    options: "",
  });
  const [text, setText] = useState("");
  const [showEmoij, setShowEmoij] = useState(false);
  const [rowArea, setRowArea] = useState(1);
  const [heightArea, setHeightArea] = useState("h-96 ml-2");

  const AddEmoji = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji); // set text
    setShowEmoij(false); // hide emoji
  };

  let emojiRef = useRef<any>(null);

  useEffect(() => {
    let handle = (e: any) => {
      if (!emojiRef.current.contains(e.target)) {
        setShowEmoij(false);
      }
    };
    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  function HoverShowToolMessage(index: any, option: string) {
    if (showToolsMessage.index === index && showToolsMessage.options === option) {
      return "flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md" + " " + option;
    } else {
      return "flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md hidden" + " " + option;
    }
  }

  const class_hover_iconinputchat = "cursor-pointer p-1 text-[1rem] rounded hover:bg-zinc-600";
  function HandleTextArea(e: any) {
    let lengthTextArea = e.target.value.length;
    if (lengthTextArea > 700) {
      setRowArea(8);
      setHeightArea("h-64 ml-2");
    } else if (lengthTextArea > 350) {
      setRowArea(4);
      setHeightArea("h-80 ml-2");
    } else if (lengthTextArea > 50) {
      setRowArea(2);
      setHeightArea("h-96 ml-2");
    } else if (lengthTextArea == 0) {
      setRowArea(1);
      setHeightArea("h-96 ml-2");
    }
  }

  // useEffect(() => {
  //   socketInitlizer();
  // }, []);

  // async function socketInitlizer() {
  //   await fetch("/api/socket");
  //   socket = io();
  //   socket.on("receive-message", (data: any) => {
  //     console.log(data);
  //   });
  // }

  const ComponentThread = () => {
    return (
      <div className="w-3/6 border-l-2 border-zinc-700">
        {/* header thread */}
        <div className="h-[8%] flex items-center border-b-2 border-zinc-700">
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center gap-2">
              <div className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">
                <FaAngleLeft className="text-white" />
              </div>
              <span className="text-white font-semibold">Thread</span>
              <span className="text-slate-400 text-sm"># proj-datn</span>
            </div>
            <div
              className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer"
              onClick={() => {
                setShowThread({ ...showThread, status: !showThread.status });
              }}
            >
              <FaXmark />
            </div>
          </div>
        </div>
        {/* content message */}
        <div className="h-[91%]">
          <div className="overflow-y-scroll max-h-full">
            {/* message replies */}
            <div className="flex items-center gap-1 border-b-2 border-zinc-700">
              <div className="w-full grid grid-cols-1 grid-flow-row items-end p-1 m-1">
                <div className="flex items-start space-x-2 m-1">
                  <Image className="rounded mt-2" src={arruser.find((e) => e.id == arrmessage[showThread.idMessageReplie].userid)?.image as string} alt="logo" width={35} height={35} />
                  <div className="font-medium text-white w-full">
                    <div className="relative inline-flex items-center gap-[1px]">
                      <div className="relative inline-flex mr-1">
                        <span className="">{arruser.find((e) => e.id == arrmessage[showThread.idMessageReplie].userid)?.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{arrmessage[showThread.idMessageReplie].times}</span>
                    </div>
                    {/* message wrapper */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {/* message */}
                      <div onMouseLeave={() => HoverShowToolMessage(null, "thread")} className="relative flex justify-start items-center  hover:bg-slate-600 ease-out duration-200">
                        <div className="relative inline-flex items-center">
                          <span className="text-slate-400">{arrmessage[showThread.idMessageReplie].content}</span>
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
                {arrmessage[showThread.idMessageReplie].comment.map((item, index) => (
                  <div key={item.id} className="flex items-start space-x-2 m-1">
                    <Image className="rounded mt-1" src={arruser.find((e) => e.id == item.userid)?.image as string} alt="logo" width={40} height={40} />
                    <div className="font-medium text-white w-full">
                      <div className="relative inline-flex items-center">
                        <div className="relative inline-flex mr-1">
                          <span className="">{arruser.find((e) => e.id == item.userid)?.name as string}</span>
                        </div>
                        <span className="text-xs text-slate-400">{item.times}</span>
                      </div>
                      {/* message wrapper */}
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {/* message */}
                        <div
                          key={item.id}
                          onMouseEnter={() => {
                            HoverShowToolMessage(index, "thread");
                            setShowToolMessage({
                              index: index as number,
                              options: "thread",
                            });
                          }}
                          onMouseLeave={() => {
                            HoverShowToolMessage(-1, "");
                            setShowToolMessage({
                              index: -1,
                              options: "",
                            });
                          }}
                          className="relative flex justify-start items-center cursor-pointer hover:bg-slate-600 ease-out duration-200"
                        >
                          <div className="relative inline-flex items-center">
                            <span className="text-slate-400 pt-1 pb-1">{item.comment}</span>
                          </div>
                          <div className={HoverShowToolMessage(index, "thread")}>
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
                ))}
              </div>
            </div>
            {/* input */}
            <div className="border-t-2 border-zinc-700">
              <div className="grid grid-flow-row mt-4 m-4 p-2 bg-zinc-800 rounded-lg ring-1 ring-zinc-500">
                <div className="flex items-center gap-4 text-zinc-400 p-1">
                  <FaB />
                  <FaItalic />
                  <AiOutlineUnderline />
                  <AiOutlineLink />
                  <AiOutlineOrderedList />
                  <AiOutlineBars />
                  <FaCode />
                  <AiOutlineCode />
                </div>
                <textarea rows={1} className="p-1 bg-zinc-800 border-none placeholder:text-zinc-500 focus:ring-0 text-white" placeholder="Write a message..." />
                <div className="flex items-center justify-between text-zinc-400">
                  <div className="flex gap-4 p-1">
                    <FaCirclePlus />
                    <FaRegFaceSmile />
                    <FaAt />
                    <FaVideo />
                    <FaMicrophone />
                  </div>
                  <div className="flex items-center rounded p-1 bg-zinc-800 text-zinc-400">
                    <div className="cursor-pointer ease-linear duration-200 p-1">
                      <FaPaperPlane className="" />
                    </div>
                    <div className="h-4 border-r-[1px] border-zinc-700 p-0 m-0"></div>
                    <div className="cursor-pointer ease-linear duration-200 p-1">
                      <FaAngleDown className="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen">
      {/* top */}
      <div className="h-auto bg-fuchsia-900 flex justify-around items-center">
        <div className="flex justify-center w-1/2 bg-gray-50 rounded m-2">
          <input className="p-1 ml-2 w-full bg-gray-50 border-none focus:border-none focus:ring-0 focus:ring-offset-0" type="text" placeholder="Search datn" />
          <div className="inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none">
            <FaSliders />
          </div>
          <div className=" mr-2 inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none">
            <FaMagnifyingGlass />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <FaCreativeCommonsBy className="m-2 text-white" />
          <Image className="rounded bg-white" src="/images.jpg" alt="logo" width={40} height={40} />
          <span className="text-white font-sans">lequocphong@gmail.com</span>
        </div>
      </div>
      {/* bottom */}
      <div className="flex bg-zinc-900 w-full h-[43.2rem] justify-start">
        {/* col 1 */}
        <div className="relative w-[16rem]">
          <div className="h-14 p-2 border-b-2 border-zinc-700 text-white font-semibold">
            <div className="flex items-center justify-between">
              <Dropdown inline label="datn">
                <Dropdown.Header>
                  <span className="block text-sm font-bold">Bonnie success</span>
                  <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Features</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
              <div className="bg-white p-2 rounded-full">
                <FaPenToSquare className="text-black" />
              </div>
            </div>
          </div>
          <div className="h-56 border-b-2 border-zinc-700">
            <ul className="font-semibold cursor-pointer text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center gap-3 hover:bg-slate-700 ease-out duration-100 rounded-lg m-1 p-2">
                <FaRegMessage />
                Threads
              </li>
              <li className="flex items-center gap-3 hover:bg-slate-700 ease-out duration-100 rounded-lg m-1 p-2">
                <FaAt />
                Mentions & reactions
              </li>
              <li className="flex items-center gap-3 hover:bg-slate-700 ease-out duration-100 rounded-lg m-1 p-2">
                <FaPaperPlane />
                Dafts & sent
              </li>
              <li className="flex items-center gap-3 hover:bg-slate-700 ease-out duration-100 rounded-lg m-1 p-2">
                <FaRegFile />
                Files
              </li>
              <li className="flex items-center gap-3 hover:bg-slate-700 ease-out duration-100 rounded-lg m-1 p-2">
                <FaEllipsisVertical />
                More
              </li>
            </ul>
          </div>
          <div className="h-80">
            <ul className=" text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center gap-1 rounded-lg p-1 m-1">
                <div className="p-1 hover:bg-slate-700 ease-out duration-300 rounded">
                  {showMenuChannel ? <FaCaretDown onClick={() => setShowMenuChannel(!showMenuChannel)} className="cursor-pointer" /> : <FaCaretRight onClick={() => setShowMenuChannel(!showMenuChannel)} className="cursor-pointer" />}
                </div>
                <div className="font-semibold flex items-center gap-1 cursor-pointer hover:bg-slate-700 ease-out duration-100 rounded">
                  <Dropdown inline label="Channels">
                    <Dropdown.Item>Create</Dropdown.Item>
                    <Dropdown.Item>Manage</Dropdown.Item>
                  </Dropdown>
                </div>
              </li>
              {showMenuChannel && (
                <ul>
                  <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                    <span className="font-bold text-xl italic ml-1">#</span>
                    general
                  </li>
                  <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                    <span className="font-bold text-xl italic ml-1">#</span>
                    general
                  </li>
                </ul>
              )}
              <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                <span className="font-bold text-xl italic ml-1">#</span>
                proj-datn
              </li>
              <li className="flex items-center gap-1 rounded-lg m-1 p-1">
                <div className="p-1 hover:bg-slate-700 ease-out duration-300 rounded">
                  {showDirectMessage ? (
                    <FaCaretDown onClick={() => setShowDirectMessage(!showDirectMessage)} className="cursor-pointer" />
                  ) : (
                    <FaCaretRight onClick={() => setShowDirectMessage(!showDirectMessage)} className="cursor-pointer" />
                  )}
                </div>
                <div className="font-semibold flex items-center gap-14 cursor-pointer">
                  <div className="hover:bg-slate-700 ease-out duration-100 rounded">
                    <Dropdown inline label="Direct messages">
                      <Dropdown.Item>Create</Dropdown.Item>
                      <Dropdown.Item>Manage</Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </li>
              {showDirectMessage && (
                <ul className="">
                  <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                    <Image className="rounded bg-white" src="/images.jpg" alt="logo" width={20} height={20} />
                    Kuga
                  </li>
                  <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                    <Image className="rounded bg-white" src="/images.jpg" alt="logo" width={20} height={20} />
                    LE QUOC PHONG
                  </li>
                  <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                    <Image className="rounded bg-white" src="/images.jpg" alt="logo" width={20} height={20} />
                    LE QUOC PHONG
                  </li>
                  <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                    <FaRegSquarePlus />
                    Add coworkers
                  </li>
                </ul>
              )}
            </ul>
          </div>
          <div className="h-16 border-t-2 border-zinc-700 pb-2 flex items-center justify-between rounded-t-xl p-2">
            <div className="flex items-center justify-center text-white font-semibold gap-1">
              <span>datn</span>
              <FaChevronDown />
            </div>
            <div className="flex items-center gap-2 text-slate-700 rounded-xl border-2 p-1 cursor-pointer">
              <FaCircle />
              <FaHeadphones />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-[84rem]">
          {/* col 2 */}
          <div className="w-full border-l-2 border-zinc-700 grid">
            {/* header thread */}
            <div className="h-14 flex items-center border-b-2 border-zinc-700">
              <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Dropdown inline label="# proj-datn">
                    <Dropdown.Item>View profile</Dropdown.Item>
                    <Dropdown.Item>Start a conversation</Dropdown.Item>
                  </Dropdown>
                </div>
                <div className="flex items-center text-white gap-2 hover:bg-slate-600 ease-linear duration-150 p-1 rounded cursor-pointer">
                  <div className="relative inline-flex">
                    <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                    <div className="absolute h-3 w-3 -bottom-[1px] -right-1 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs">2</span>
                </div>
              </div>
            </div>
            {/* bookmark */}
            <div className="text-gray-500 font-medium text-sm border-b-2 border-zinc-700">
              <div className="flex items-center ml-2 gap-1">
                <div className="flex gap-1 items-center text-slate-400 cursor-pointer">
                  <FaPlus />
                  <span className="text-sm">Add bookmark</span>
                </div>
              </div>
            </div>
            <div className="row-span-12 grid items-end">
              {/* content message */}
              <div className={heightArea}>
                <div className="overflow-y-scroll h-full">
                  <div className="grid text-slate-300 gap-2 p-2">
                    <span className="text-3xl font-semibold"># proj-datn</span>
                    <div className="flex gap-1">
                      <span className="font-thin text-blue-500">@KUGA</span>
                      <span>created this channel on June 30th. This is the very beginning of the # proj-datn channel.</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center ring-1 ring-slate-600 rounded-md p-1 cursor-pointer">
                        <FaPencil />
                        <span>Add description</span>
                      </div>
                      <div className="flex items-center ring-1 ring-slate-600 rounded-md p-1 cursor-pointer">
                        <FaPencil />
                        <span>Add description</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-full grid grid-cols-1 grid-flow-row items-end p-1 m-1">
                      {arrmessage.map((item, indexmessage) => (
                        <div key={item.id} className="flex items-start space-x-2 m-1">
                          <Image className="rounded mt-1" src={arruser.find((e) => e.id == item.userid)?.image as string} alt="logo" width={40} height={40} />
                          <div className="font-medium text-white w-full">
                            <div className="relative inline-flex items-center">
                              <div className="relative inline-flex mr-1">
                                <span className="">{arruser.find((e) => e.id == item.userid)?.name}</span>
                              </div>
                              <span className="text-xs text-slate-400">{item.times}</span>
                            </div>
                            {/* message wrapper */}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {/* message */}
                              <div
                                key={item.id}
                                onMouseEnter={() => {
                                  HoverShowToolMessage(indexmessage, "message");
                                  setShowToolMessage({
                                    index: indexmessage as number,
                                    options: "message",
                                  });
                                }}
                                onMouseLeave={() => {
                                  HoverShowToolMessage(-1, "");
                                  setShowToolMessage({
                                    index: -1,
                                    options: "",
                                  });
                                }}
                                className="relative flex justify-start items-center cursor-pointer hover:bg-slate-600 ease-out duration-200"
                              >
                                <div className="relative inline-flex items-center">
                                  <span className="text-slate-400 pt-1 pb-1">{item.content}</span>
                                </div>
                                <div className={HoverShowToolMessage(indexmessage, "message")}>
                                  <div className="cursor-pointer hover:bg-slate-600 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-green-400">
                                    <FaSquareCheck />
                                  </div>
                                  <div className="cursor-pointer hover:bg-slate-600 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-yellow-50">
                                    <FaRegEye />
                                  </div>
                                  <div className="cursor-pointer hover:bg-slate-600 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-yellow-200">
                                    {" "}
                                    <FaHandsBubbles />
                                  </div>
                                  <div className="cursor-pointer hover:bg-slate-600 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-xs text-yellow-50">
                                    <FaRegFaceSmile />
                                    <span>React</span>
                                  </div>
                                  <div
                                    onClick={() => {
                                      setShowThread({ status: true, idMessageReplie: indexmessage });
                                    }}
                                    className="cursor-pointer hover:bg-slate-600 rounded-t-md active:bg-slate-400 p-1 flex gap-1 justify-center items-center text-xs text-yellow-50"
                                  >
                                    <FaRegMessage />
                                    <span>Reply</span>
                                  </div>
                                </div>
                              </div>
                              {/* count replies */}
                              <div className="relative inline-flex items-center justify-center gap-8 text-blue-400 font-normal">
                                <div className="flex items-center justify-center gap-1">
                                  <Image className="rounded mt-1" src={arruser.find((e) => e.id == item.userid)?.image as string} alt="logo" width={30} height={30} />
                                  <Image className="rounded mt-1 z-10" src={arruser.find((e) => e.id == item.userid)?.image as string} alt="logo" width={30} height={30} />
                                  <div className="absolute right-[3.8rem] top-1 w-1/5 p-1 flex justify-center items-center rounded-r-md bg-gray-500 bg-opacity-50 font-medium text-white">
                                    <span>+3</span>
                                  </div>
                                </div>
                                <span className="">2 replies</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* input text */}
              <div className="border-t-2 border-zinc-700">
                <div className="grid grid-flow-row mt-4 m-4 p-2 bg-zinc-800 rounded-lg ring-1 ring-zinc-500">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <div className={class_hover_iconinputchat}>
                      <FaB />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <FaItalic />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <AiOutlineUnderline />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <AiOutlineLink />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <AiOutlineOrderedList />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <AiOutlineBars />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <FaCode />
                    </div>
                    <div className={class_hover_iconinputchat}>
                      <AiOutlineCode />
                    </div>
                  </div>
                  <textarea
                    ref={inputMessageRef}
                    onChange={(e) => {
                      HandleTextArea(e);
                      setText(e.target.value);
                    }}
                    value={text}
                    rows={rowArea}
                    className="p-1 bg-zinc-800 border-none placeholder:text-zinc-500 focus:ring-0 text-white"
                    placeholder="Write a message..."
                  />
                  <div className="flex items-center justify-between text-zinc-400">
                    <div className="flex items-center gap-2">
                      <div className={class_hover_iconinputchat}>
                        <div className="rounded-full bg-zinc-700 p-[1px]">
                          <RiAddLine />
                        </div>
                      </div>
                      {!showEmoij && (
                        <div className={class_hover_iconinputchat} onClick={() => setShowEmoij(!showEmoij)}>
                          <FaRegFaceSmile />
                        </div>
                      )}
                      {showEmoij && (
                        <div className={class_hover_iconinputchat} onClick={() => setShowEmoij(!showEmoij)}>
                          <FaFaceSmileBeam className="text-yellow-300 rotate-45" />
                        </div>
                      )}
                      <div className={class_hover_iconinputchat}>
                        <FaAt />
                      </div>
                      <div className="border-r-2 h-4"></div>
                      <div className={class_hover_iconinputchat}>
                        <BiVideo />
                      </div>
                      <div className={class_hover_iconinputchat}>
                        <BiMicrophone />
                      </div>
                      <div ref={emojiRef} className="relative inline-flex items-center justify-center">
                        {showEmoij && (
                          <div className="absolute bottom-5 m-4 p-4">
                            <Picker theme="dark" emojiSize={20} emojiButtonSize={28} onEmojiSelect={AddEmoji} data={data} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center rounded p-1 bg-zinc-800 text-zinc-400">
                      <div className="cursor-pointer ease-linear duration-200 p-1">
                        <FaPaperPlane className="" />
                      </div>
                      <div className="h-4 border-r-[1px] border-zinc-700 p-0 m-0"></div>
                      <div className="cursor-pointer ease-linear duration-200 p-1">
                        <FaAngleDown className="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* col 3 */}
          {showThread.status && <ComponentThread />}
        </div>
      </div>
    </div>
  );
}

export default App;
