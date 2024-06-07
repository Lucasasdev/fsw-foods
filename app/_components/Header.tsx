import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/Logo.png"
            alt="FSW foods"
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
