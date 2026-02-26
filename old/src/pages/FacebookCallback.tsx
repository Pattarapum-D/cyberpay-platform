import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FacebookCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            const error = searchParams.get('error');

            if (error) {
                let errorMessage = 'การเข้าสู่ระบบด้วย Facebook ไม่สำเร็จ';

                if (error === 'no_code') {
                    errorMessage = 'ไม่พบรหัสยืนยันจาก Facebook';
                } else if (error === 'auth_failed') {
                    errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
                } else if (error === 'no_email') {
                    errorMessage = 'ไม่สามารถเข้าถึงอีเมลจากบัญชี Facebook ได้';
                }

                toast({
                    title: 'เข้าสู่ระบบไม่สำเร็จ',
                    description: errorMessage,
                    variant: 'destructive',
                });
                navigate('/login');
                return;
            }

            if (!token) {
                toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่พบ token จากเซิร์ฟเวอร์',
                    variant: 'destructive',
                });
                navigate('/login');
                return;
            }

            try {
                // Save token to localStorage
                localStorage.setItem('auth_token', token);

                toast({
                    title: 'เข้าสู่ระบบสำเร็จ',
                    description: 'ยินดีต้อนรับกลับมา!',
                });

                // Redirect to home page with reload
                window.location.href = '/';
            } catch (error) {
                toast({
                    title: 'เกิดข้อผิดพลาด',
                    description: 'ไม่สามารถบันทึกข้อมูลการเข้าสู่ระบบได้',
                    variant: 'destructive',
                });
                navigate('/login');
            }
        };

        handleCallback();
    }, [searchParams, navigate, toast]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">กำลังเข้าสู่ระบบด้วย Facebook...</p>
            </div>
        </div>
    );
};

export default FacebookCallback;
