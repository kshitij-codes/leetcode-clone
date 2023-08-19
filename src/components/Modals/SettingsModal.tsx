import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ISettings } from "../Workspace/Playground/Playground";
import useLocalStorage from "@/hooks/useLocalStorage";

const EDITOR_FONT_SIZES = [
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
];

interface SettingsModalProps {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  setSettings,
  settings,
}) => {
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const handleClickDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setSettings((prev) => ({
      ...prev,
      dropdownIsOpen: !settings.dropdownIsOpen,
    }));
  };

  return (
    <div className="z-40 text-white">
      <div
        aria-modal="true"
        role="dialog"
        className="z-modal fixed inset-0 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center px-4">
          {/* overlay */}
          <div
            className="opacity-100"
            onClick={() =>
              setSettings({ ...settings, settingsModalIsOpen: false })
            }
          >
            <div className="fixed inset-0 bg-gray-8 opacity-60"></div>
          </div>

          <div className="bg-overlay-3 shadow-level4 my-8 inline-block w-[600px] min-w-full scale-100 transform !overflow-visible rounded-[13px] bg-[rgb(40,40,40)] p-0 text-left opacity-100 shadow-lg transition-all md:min-w-[420px]">
            {/* setting header */}
            <div className="flex items-center border-b border-dark-divider-border-2 px-5 py-4 text-lg  font-medium">
              Settings
              <button
                className="ml-auto cursor-pointer rounded transition-all"
                onClick={() =>
                  setSettings({
                    ...settings,
                    settingsModalIsOpen: !settings.settingsModalIsOpen,
                  })
                }
              >
                <IoClose />
              </button>
            </div>

            <div className="px-6 pb-6 pt-4">
              <div className="mt-6 flex justify-between first:mt-0">
                <div className="w-[340px]">
                  <h3 className=" text-base font-medium">Font size</h3>
                  <h3 className="text-label-3  mt-1.5">
                    Choose your preferred font size for the code editor.
                  </h3>
                </div>
                <div className="w-[170px]">
                  <div className="relative">
                    <button
                      onClick={handleClickDropdown}
                      className="bg flex w-full cursor-pointer items-center justify-between whitespace-nowrap rounded bg-dark-fill-3 px-3 py-1.5 text-left hover:bg-dark-fill-2 focus:outline-none active:bg-dark-fill-3"
                      type="button"
                    >
                      {fontSize}
                      <BsChevronDown />
                    </button>
                    {/* Show dropdown for fontsizes */}
                    {settings.dropdownIsOpen && (
                      <ul
                        className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg bg-dark-layer-1 p-2   shadow-lg focus:outline-none"
                        style={{
                          filter:
                            "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
                        }}
                      >
                        {EDITOR_FONT_SIZES.map((fontSize, idx) => (
                          <SettingsListItem
                            key={idx}
                            fontSize={fontSize}
                            selectedOption={settings.fontSize}
                            handleFontSizeChange={(fontSize) => {
                              setFontSize(fontSize);
                              setSettings({ ...settings, fontSize: fontSize });
                            }}
                          />
                        ))}
                      </ul>
                    )}
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
export default SettingsModal;

interface SettingsListItemProps {
  fontSize: string;
  selectedOption: string;
  handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  fontSize,
  selectedOption,
  handleFontSizeChange,
}) => {
  return (
    <li className="text-label-2 relative flex h-8 cursor-pointer select-none rounded-lg py-1.5 pl-2 hover:bg-dark-fill-3 dark:text-dark-label-2">
      <div
        className={`flex h-5 flex-1 items-center pr-2 ${
          selectedOption === fontSize ? "font-medium" : ""
        }`}
        onClick={() => handleFontSizeChange(fontSize)}
      >
        <div className="whitespace-nowrap">{fontSize}</div>
      </div>
      <span
        className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
          selectedOption === fontSize ? "visible" : "invisible"
        }`}
      >
        <BsCheckLg />
      </span>
    </li>
  );
};
