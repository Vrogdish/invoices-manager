import './styles.scss'

interface Props {
  className?: string;
  onClick?: () => void;
  theme?: "cancel" | "submit" | "reset" ;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ className, onClick, type, children,theme, disabled = false }: Props) {
  return (
    <button onClick={onClick} className={`my-btn ${theme} ${className}`} type={type} disabled={disabled} >
      {children}
    </button>
  );
}
