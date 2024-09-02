import { useState } from "react";

type TruncateTextProps = {
  text: string;
  maxLength: number;
};

const TruncateText = ({ text, maxLength }: TruncateTextProps) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className="mb-2">
      <p className="mb-0">
        {text.length > maxLength && isTruncated
          ? `${text.substring(0, maxLength)}...`
          : text + " "}
      </p>

      {text.length > maxLength && (
        <button
          onClick={toggleTruncate}
          className="inline-block text-primary font-semibold hover:underline">
          {isTruncated ? "See More" : "See Less"}
        </button>
      )}
    </div>
  );
};

export default TruncateText;
