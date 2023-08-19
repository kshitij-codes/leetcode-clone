import React, { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { toast } from "react-toastify";
import { auth, firestore } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [user] = useAuthState(auth);

  const router = useRouter();
  const pid = router.query.pid;

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setSuccess(true);
          setTimeout(() => setSuccess(false), 4000);
          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(pid),
          });
          setSolved(true);
        }
      }
    } catch (error: any) {
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal",
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  const onCodeChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pid, user, problem.starterCode]);

  return (
    <div className="relative flex flex-col overflow-x-hidden bg-dark-layer-1">
      <PreferenceNav settings={settings} setSettings={setSettings} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            onChange={onCodeChange}
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          ></CodeMirror>
        </div>
        <div className="w-full overflow-auto px-5">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full cursor-pointer flex-col justify-center">
              <div className="mb-1 text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="bottom absolute-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 mt-2 items-start text-white"
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`px relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-dark-fill-3 px-4 py-1 font-medium transition-all hover:bg-dark-fill-2 focus:outline-none ${
                      activeTestCaseId === index
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-4 font-semibold">
            <p className="mt-4 text-sm font-medium text-white ">Input: </p>
            <div className="mt-2  w-full cursor-text rounded-lg border border-transparent bg-dark-fill-3 px-3 py-[10px] text-white">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="mt-4 text-sm font-medium text-white ">Output: </p>
            <div className="mt-2  w-full cursor-text rounded-lg border border-transparent bg-dark-fill-3 px-3 py-[10px] text-white">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};
export default Playground;
