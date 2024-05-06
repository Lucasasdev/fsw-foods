import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <div>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full object-contain"
        quality={100}
        {...props}
      />
    </div>
  );
};

export default PromoBanner;
