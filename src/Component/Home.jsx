import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  addToPastes,
  resetAllPastes,
  updateToPastes,
} from "../redux/pasteSlice";
import { Copy, PlusCircle } from "lucide-react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36),
      createdAt: new Date().toLocaleDateString("en-US",{
        year:"numeric",
        month:"long",
        day:"numeric"
      }),
    };
    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }
    // after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
          />
          <button
            onClick={createPaste}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue font-medium rounded-lg text-sm
          px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
          {pasteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue
          font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>
          <textarea
            className="rounded-2xl mt-4, min-w-[500px] p-4"
            value={value}
            placeholder="enter content here"
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
