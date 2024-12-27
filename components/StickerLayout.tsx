import { PartLabel } from "./PartLabel"
import { Part, Size } from "@/lib/types"

interface StickerLayoutProps {
  size: Size;
  bricks: Part[];
}

export function StickerLayout({ size, bricks }: StickerLayoutProps) {
  const containerStyle = {
    width: `${size.width}mm`,
    height: `${size.height}mm`,
    border: "1px solid black",
  }

  return (
    <div 
      style={containerStyle} 
      className="relative flex flex-row flex-wrap items-start content-start gap-1 p-1 overflow-hidden"
    >
      {bricks.map((part) => (
        <PartLabel key={part.id} part={part} />
      ))}
    </div>
  )
}

export default StickerLayout

