"use client";
import { FaBars, FaCircleInfo, FaMagnifyingGlass, FaPencil, FaPlus, FaSliders } from "react-icons/fa6";
import Image from "next/image";
import { Dropdown } from "flowbite-react";
export default () => {
  return (
    <div className="h-screen bg-slate-900">
      {/* header */}
      <div className="h-auto bg-fuchsia-950 text-white">
        <div className="flex justify-between items-center ml-2 mr-2">
          <FaBars />
          <div className="flex justify-center w-1/2 bg-gray-50 rounded m-2">
            <input className="p-1 ml-2 w-full bg-gray-50 border-none focus:border-none focus:ring-0 focus:ring-offset-0" type="text" placeholder="Search datn" />
            <div className="inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none">
              <FaSliders />
            </div>
            <div className=" mr-2 inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none">
              <FaMagnifyingGlass />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaCircleInfo className="cursor-pointer text-white" />
            <div className="flex items-center justify-center">
              <Image className="rounded bg-white" src="/images.jpg" alt="logo" width={40} height={40} />
              <span className="text-white font-sans">lequocphong@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="h-[93%] flex justify-between">
        <div className="w-1/6 bg-red-500">1</div>
        {/* col 2 */}
        <div className="w-3/6">
          {/* row 1 */}
          <div className="h-auto flex items-center border-b-2 border-slate-800">
            <div className="w-full mr-2 ml-2 p-3 flex items-center justify-between">
              <div className="font-semibold text-white">
                <Dropdown inline label="# proj-datn">
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
              </div>
              <div className="flex items-center gap-2">
                <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                <span className="text-sm text-slate-400">2</span>
              </div>
            </div>
          </div>
          {/* row 2 */}
          <div className="h-auto text-gray-500 font-medium text-sm border-b-2 border-slate-800">
            <div className="flex items-center m-2 p-1 gap-1">
              <FaPlus />
              <span>Add a bookmark</span>
            </div>
          </div>
          {/* row 3 */}
          <div className="">
            <div className="grid text-slate-300 gap-2 m-2 p-2">
              <span className="text-3xl font-semibold"># proj-datn</span>
              <div className="flex gap-1">
                <span className="font-thin text-blue-500">@KUGA</span>
                <span>created this channel on June 30th. This is the very beginning of the # proj-datn channel.</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center ring-1 ring-slate-600 rounded-md p-1">
                  <FaPencil />
                  <span>Add description</span>
                </div>
                <div className="flex items-center ring-1 ring-slate-600 rounded-md p-1">
                  <FaPencil />
                  <span>Add description</span>
                </div>
              </div>
            </div>
            <div>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate dark:text-white">Neil Sims</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@flowbite.com</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">$320</div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate dark:text-white">Bonnie Green</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@flowbite.com</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">$3467</div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate dark:text-white">Michael Gough</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@flowbite.com</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">$67</div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate dark:text-white">Thomas Lean</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@flowbite.com</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">$2367</div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image className="rounded bg-white" src="/images.png" alt="logo" width={30} height={30} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate dark:text-white">Lana Byrd</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@flowbite.com</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">$367</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* row 4 */}
          <div className=""></div>
        </div>
        {/* col 3 */}
        <div className="w-2/6 bg-blue-500">3</div>
      </div>
    </div>
  );
};
