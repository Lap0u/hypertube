type Buttonprops = {
  text: string;
  onClick: () => void;
  secondary?: boolean;
};

const Button = ({ text, onClick, secondary }: Buttonprops) => {
  let styles = '';
  if (secondary == true) {
    styles =
      ' bg-white hover:bg-secYellow hover:text-secMarine border-2 border-secMarine';
  } else {
    styles = 'text-5xl bg-secYellow hover:bg-secMarine hover:text-secYellow';
  }
  return (
    <button
      onClick={onClick}
      className={` px-8 py-4 text-secMarine rounded-md transition-all delay-75 ease-out ${styles}`}>
      {text}
    </button>
  );
};

export default Button;
