import React from "react";

const RectangleSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-2.5">
      <div className="flex w-full items-center space-x-2">
        <div className="h-6 w-12 rounded-full bg-dark-fill-3"></div>
      </div>
    </div>
  );
};
export default RectangleSkeleton;
