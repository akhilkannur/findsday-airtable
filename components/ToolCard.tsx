import Image from "next/image";

interface ToolCardProps {
  title: string;
  category: string;
  description: string;
  testimonial: string;
  makerName: string;
  makerTitle: string;
}

export default function ToolCard({
  title,
  category,
  description,
  testimonial,
  makerName,
  makerTitle,
}: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded-xl mb-4"></div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <span className="inline-block bg-purple-100 text-[#A052DE] text-xs px-2 py-1 rounded mb-3">
          {category}
        </span>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="text-xs text-gray-500">
          <p>{testimonial}</p>
          <p className="font-medium">— {makerName}, {makerTitle}</p>
        </div>
      </div>
    </div>
  );
}
