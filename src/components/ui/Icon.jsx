import {
  Briefcase,
  Building2,
  CodeXml,
  Cpu,
  FileText,
  GraduationCap,
  HeartPulse,
  PenTool,
  Plane,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const map = {
  code: CodeXml,
  pen: PenTool,
  target: Target,
  search: Search,
  trending: TrendingUp,
  social: Share2,
  shield: ShieldCheck,
  sparkles: Sparkles,
  content: FileText,
  cart: ShoppingBag,
  health: HeartPulse,
  education: GraduationCap,
  cpu: Cpu,
  briefcase: Briefcase,
  plane: Plane,
  building: Building2,
};

export default function Icon({ name, size = 22, strokeWidth = 1.6, ...rest }) {
  const Cmp = map[name] || Sparkles;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
