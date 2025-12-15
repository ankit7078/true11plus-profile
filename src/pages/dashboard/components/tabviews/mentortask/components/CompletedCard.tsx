import React from "react";
import { CheckCircle2, Image, Link as LinkIcon, Copy } from "lucide-react";

// 1. Define the shape of the Item data
export interface CompletedItem {
  id?: string | number; // Optional, useful if you map over a list
  title: string;
  desc: string;
  image?: string; // Optional string (url)
  completedTime: string;
  shareLink?: string; // Optional string
}

// 2. Define the Props for the component
interface CompletedCardProps {
  item: CompletedItem;
  onCopyLink: (link: string) => void;
  onOpenLink: (link: string) => void;
}

const CompletedCard: React.FC<CompletedCardProps> = ({
  item,
  onCopyLink,
  onOpenLink,
}) => {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
      {/* Icon Box */}
      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm truncate">
              {item.title}
            </h4>
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">
              {item.desc}
            </p>
          </div>
          
          {/* Image Handling */}
          {item.image ? (
            <img
              src={item.image}
              alt="done"
              className="w-14 h-12 rounded-md object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-12 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-200 flex-shrink-0">
              <Image className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Footer: Time & Actions */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-400">{item.completedTime}</div>
          
          <div className="flex items-center gap-2">
            {item.shareLink && (
              <>
                <button
                  onClick={() => onOpenLink(item.shareLink!)}
                  className="text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600 flex items-center gap-1 hover:bg-gray-100 transition-colors"
                >
                  <LinkIcon className="w-3 h-3" /> Open
                </button>
                <button
                  onClick={() => onCopyLink(item.shareLink!)}
                  className="text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600 flex items-center gap-1 hover:bg-gray-100 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedCard;