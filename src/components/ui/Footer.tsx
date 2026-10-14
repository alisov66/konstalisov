import { typography, typeStyle } from "@/styles";

export default function Footer() {
  return (
    <footer className="site-footer" style={typeStyle(typography.body.s)}>
      <div className="page-container"><p>© Konstantin Alisov</p><p>2026</p></div>
    </footer>
  );
}
