import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Gamepad2, Loader2, Check, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PageTransition from '@/components/PageTransition';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Password validation
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast({
        title: 'รหัสผ่านไม่ถูกต้อง',
        description: 'กรุณาตั้งรหัสผ่านตามเงื่อนไขที่กำหนด',
        variant: 'destructive',
      });
      return;
    }

    if (!doPasswordsMatch) {
      toast({
        title: 'รหัสผ่านไม่ตรงกัน',
        description: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'รีเซ็ตรหัสผ่านสำเร็จ',
        description: 'คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว',
      });
      navigate('/login');
    }
  };

  const PasswordCheck = ({ valid, text }: { valid: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-xs ${valid ? 'text-green-500' : 'text-muted-foreground'}`}>
      {valid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {text}
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-cyber flex items-center justify-center glow-primary">
                <Gamepad2 className="w-7 h-7 text-background" />
              </div>
              <span className="text-3xl font-bold text-glow">CYBERPAY</span>
            </motion.div>
          </div>

          <Card className="glass-card border-border/50">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center">ตั้งรหัสผ่านใหม่</CardTitle>
              <CardDescription className="text-center">
                กรุณาตั้งรหัสผ่านใหม่ของคุณ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">รหัสผ่านใหม่</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password Requirements */}
                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <PasswordCheck valid={passwordChecks.length} text="อย่างน้อย 8 ตัว" />
                    <PasswordCheck valid={passwordChecks.uppercase} text="ตัวพิมพ์ใหญ่" />
                    <PasswordCheck valid={passwordChecks.lowercase} text="ตัวพิมพ์เล็ก" />
                    <PasswordCheck valid={passwordChecks.number} text="ตัวเลข" />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary ${
                        confirmPassword && !doPasswordsMatch ? 'border-destructive' : ''
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword && !doPasswordsMatch && (
                    <p className="text-xs text-destructive">รหัสผ่านไม่ตรงกัน</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-cyber hover:opacity-90 text-background font-semibold h-11 pulse-glow"
                  disabled={isLoading || !isPasswordValid || !doPasswordsMatch}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'ยืนยันรหัสผ่านใหม่'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;
