type LogoProps = {
  color?: 'black' | 'white';
  width?: string;
  height?: string;
};

export function Logo({ color = 'black', width = '33', height = '46' }: LogoProps) {
  return (
    <img
      src="/faviocn.svg"
      alt="Delirio logo"
      width={width}
      height={height}
      style={{
        display: 'block',
        objectFit: 'contain',
        flexShrink: 0,
        filter: color === 'white' ? 'invert(1)' : 'none',
      }}
    />
  );
}
