import { MouseEventHandler } from 'react';

type IconProps = {
  name: string;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

export default function Icon({ name, className, onClick }: IconProps) {
  return (
    <svg className={className} onClick={onClick}>
      <use href={`/img/icon/sprite.svg#${name}`}></use>
    </svg>
  );
}
