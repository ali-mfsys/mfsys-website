import type {ImgHTMLAttributes} from "react";

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>,"src"> & {
  alt: string;
};

export default function BrandLogo({alt,...props}:BrandLogoProps){
  return <img src="/brand/mfsys-logo.png" alt={alt} {...props}/>;
}
