import React, { useEffect, useState } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "@/components/Modals/SettingsModal";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  settings,
  setSettings,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozscreenchange", exitHandler);
      document.addEventListener("MSFullScreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex h-11 w-full items-center justify-between bg-dark-layer-2">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded bg-dark-fill-3 px-2 py-1.5 font-medium  text-dark-label-2 hover:bg-dark-fill-2 focus:outline-none">
          <div className="flex items-center px-1">
            <div className="text-label-2 dark:text-dark-label-2">
              JavaScript
            </div>
          </div>
        </button>
      </div>
      <div className="m-2 flex items-center">
        <button
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="h-4 w-4 text-lg font-bold text-dark-gray-6">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-lg font-bold text-dark-gray-6">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
            ={" "}
          </div>
          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};
export default PreferenceNav;
