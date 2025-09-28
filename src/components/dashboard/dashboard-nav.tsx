"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { BarChart, MessageSquare, Users, FileQuestion, Settings, Home } from "lucide-react";

const navItems = [
    { href: '/dashboard', icon: BarChart, label: 'Analytics' },
    { href: '/dashboard/chats', icon: MessageSquare, label: 'Chats' },
    { href: '/dashboard/leads', icon: Users, label: 'Leads' },
    { href: '/dashboard/faqs', icon: FileQuestion, label: 'FAQs' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function DashboardNav({ isMobile = false }: { isMobile?: boolean }) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-6">
                <Link className="flex items-center gap-2 font-semibold" href="/">
                    <Logo className="h-6 w-6" />
                    <span>BizChatPlug</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === item.href && "bg-muted text-primary"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="mt-auto p-4 border-t">
                 <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                    <Home className="h-4 w-4" />
                    Back to Website
                </Link>
            </div>
        </div>
    )
}
