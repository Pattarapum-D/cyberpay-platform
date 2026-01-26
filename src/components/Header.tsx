import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Search, User, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { path: "/", label: "หน้าแรก" },
  { path: "/history", label: "ประวัติการเติม" },
  { path: "/vip", label: "VIP" },
  { path: "/support", label: "ช่วยเหลือ" },
];

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-cyber flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CYBERPAY
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-1">
                Game Top-up Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="headerNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-cyber rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* VIP Badge */}
            <Link to="/vip" className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30"
              >
                <Crown className="w-4 h-4 text-secondary" />
                <span className="text-xs font-medium text-secondary">Silver</span>
              </motion.div>
            </Link>

            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* User Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
