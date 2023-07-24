"use client";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { Timeline } from "flowbite-react";
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
  FaEllipsisVertical,
  FaHandsBubbles,
  FaHeadphones,
  FaItalic,
  FaMagnifyingGlass,
  FaMicrophone,
  FaPaperPlane,
  FaPenToSquare,
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
import Thread from "../components/Thread";

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

function App() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [imessage, setImessage] = useState({
    indexParent: null,
    index: null,
  });
  const inputRef = useRef(null);
  const [activeThread, setActiveThread] = useState(false);

  function HoverActive(indexParent, index) {
    setImessage({
      indexParent: indexParent,
      index: index,
    });
  }

  function HoverActiveStatus(indexParent, index) {
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

  return (
    <div className="h-screen">
      {/* top */}
      <div className="h-fit bg-fuchsia-900 flex justify-around items-center ">
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
      <div className=" bg-slate-900 grid grid-flow-col">
        {/* col 1 */}
        <div className="border-r-2 border-slate-800">
          <div className="h-16 flex items-center justify-between p-2 border-b-2 border-slate-800 text-white font-semibold">
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
          <div className="h-52 border-b-2 border-slate-800">
            <ul className="font-semibold cursor-pointer text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                <FaRegMessage />
                Threads
              </li>
              <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                <FaAt />
                Mentions & reactions
              </li>
              <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                <FaPaperPlane />
                Dafts & sent
              </li>
              <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                <FaRegFile />
                Files
              </li>
              <li className="flex items-center gap-2 hover:bg-slate-700 ease-out duration-100 rounded-lg m-2 p-1">
                <FaEllipsisVertical />
                More
              </li>
            </ul>
          </div>
          <div className="h-80">
            <ul className=" text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center gap-2 rounded-lg m-2 p-1">
                {show ? (
                  <FaCaretDown onClick={() => setShow(!show)} className="cursor-pointer hover:bg-slate-700 ease-out duration-300 rounded" />
                ) : (
                  <FaCaretRight onClick={() => setShow(!show)} className="cursor-pointer hover:bg-slate-700 ease-out duration-300 rounded" />
                )}
                <div className="font-semibold flex items-center gap-1 cursor-pointer hover:bg-slate-700 ease-out duration-100 rounded">
                  <Dropdown inline label="Channels">
                    <Dropdown.Item>Create</Dropdown.Item>
                    <Dropdown.Item>Manage</Dropdown.Item>
                  </Dropdown>
                </div>
              </li>
              {show && (
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
              <li className="flex items-center gap-2 rounded-lg m-2 p-1">
                {show2 ? (
                  <FaCaretDown onClick={() => setShow2(!show2)} className="cursor-pointer hover:bg-slate-700 ease-out duration-300 rounded" />
                ) : (
                  <FaCaretRight onClick={() => setShow2(!show2)} className="cursor-pointer hover:bg-slate-700 ease-out duration-300 rounded" />
                )}
                <div className="font-semibold flex items-center gap-14 cursor-pointer">
                  <div className="hover:bg-slate-700 ease-out duration-100 rounded">
                    <Dropdown inline label="Direct messages">
                      <Dropdown.Item>Create</Dropdown.Item>
                      <Dropdown.Item>Manage</Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </li>
              {show2 && (
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
          <div className="h-20 border-t-2 border-slate-800 pb-2 flex items-center justify-between rounded-t-xl p-2">
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
        {/* col 2 */}
        <div className="col-span-4">
          <div className="flex items-center border-b-2 border-slate-800 h-16">
            <div className="flex items-center justify-between w-full m-2 p-2">
              <div>
                <span className="text-white font-semibold">#projec-datn</span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="rounded bg-white" src="/images.jpg" alt="logo" width={40} height={40} />
                <span className="text-white">2</span>
              </div>
            </div>
          </div>
          <div className="text-gray-500 font-medium text-sm border-b-2 border-slate-800">
            <div className="flex items-center m-2 p-1 gap-1">
              <FaPlus />
              <span>Add a bookmark</span>
            </div>
          </div>
          {/* content message */}
          <div className="row-span-4">
            <div className="">
              <Timeline className="overflow-y-scroll max-h-56">
                <Timeline.Item className="mb-2">
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time className="text-white font-medium">February 2022</Timeline.Time>
                    <Timeline.Body className="mb-0 mt-2">
                      <ul className="space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                        {arrMessage.map((item, indexParent) => (
                          <li className="" key={indexParent}>
                            <div className="grid grid-cols-1 grid-flow-row">
                              <div className="flex gap-2 text-white font-semibold">
                                <Image className="rounded bg-white" src={item.image} alt="logo" width={40} height={40} />
                                <div className="flex gap-1 items-center">
                                  <span>{item.name}</span>
                                  <span className="text-xs text-slate-400">{item.time} PM</span>
                                </div>
                              </div>
                              <div className="content pl-12 grid grid-flow-row">
                                {item.message.map((item, index) => (
                                  <div
                                    key={index}
                                    onMouseEnter={() => HoverActive(indexParent, index)}
                                    onMouseLeave={() => HoverActive(null, null)}
                                    className="relative flex justify-between items-center  hover:bg-slate-600 ease-out duration-200"
                                  >
                                    <span className="imessage p-1 cursor-pointer text-slate-400">{item.content}</span>
                                    <div className={HoverActiveStatus(indexParent, index)}>
                                      <FaSquareCheck className="cursor-pointer hover:scale-90 text-green-500" />
                                      <FaRegEye className="cursor-pointer hover:scale-90 text-white" />
                                      <FaHandsBubbles className="cursor-pointer hover:scale-90 text-yellow-200" />
                                      <div className="cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50">
                                        <FaRegFaceSmile />
                                        <span>React</span>
                                      </div>
                                      <div onClick={() => console.log("ok")} className="cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50">
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
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
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
              <textarea ref={inputRef} rows={4} className="p-2 m-2 bg-slate-600 border-none placeholder:text-slate-400 focus:ring-0 text-white" placeholder="Write a message..." />
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
        {/* col 3 */}
        <Thread />
      </div>
    </div>
  );
}

export default App;
