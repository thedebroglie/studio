'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck, User, Building, Briefcase, Search, Wallet } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

// Role Mapping: Defines the wallet address for the University role.
// You can use the following private key with MetaMask to test the University role:
// Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
// Any other wallet address will be assigned the 'student' role.
const ROLES: { [key: string]: string } = {
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8': 'university',
};
const getUserRole = (address: string): string => {
    return ROLES[address.toLowerCase()] || 'student';
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Defines all possible navigation links and the roles that can see them.
  const allMenuItems = [
    { href: '/dashboard/student', label: 'Student Wallet', icon: User, role: 'student' },
    { href: '/dashboard/university', label: 'University Portal', icon: Building, role: 'university' },
    { href: '/dashboard/employer', label: 'Employer Portal', icon: Briefcase, role: 'all' },
    { href: '/dashboard/search', label: 'Certificate Search', icon: Search, role: 'all' },
  ];

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const address = accounts[0];
            const role = getUserRole(address);
            setWalletAddress(address);
            setUserRole(role);
          }
        } catch (error) {
          console.error("Error checking for MetaMask connection", error);
        }
      }
    };
    checkConnection();
  }, []);

  useEffect(() => {
    // This effect ensures that a user cannot navigate to a page they don't have access to.
    if (userRole) {
      const allowedPaths = allMenuItems
        .filter(item => item.role === userRole || item.role === 'all')
        .map(item => item.href);

      const currentPathAllowed = allowedPaths.some(path => pathname.startsWith(path));

      if (!currentPathAllowed) {
        const defaultPathForRole = allowedPaths[0] || '/';
        router.push(defaultPathForRole);
      }
    }
  }, [userRole, pathname, router]);


  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        const role = getUserRole(address);
        setWalletAddress(address);
        setUserRole(role);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
      alert('Error connecting to MetaMask. Check the console for details.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setUserRole(null);
  };
  
  const getShortAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  
  // Filters the navigation menu based on the connected user's role.
  const visibleMenuItems = allMenuItems.filter(item => {
    if (!userRole) return false; // Hide all items if not connected
    if (item.role === 'all') return true;
    return item.role === userRole;
  });


  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 p-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden">
                Cred-Pass
              </span>
            </Link>
            <div className="p-2">
              {walletAddress && userRole ? (
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold text-center capitalize group-data-[collapsible=icon]:hidden">
                        {userRole} Role
                    </span>
                    <span className="text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                        {getShortAddress(walletAddress)}
                    </span>
                    <Button onClick={disconnectWallet} variant="outline" size="sm" className="w-full">
                       <span className="group-data-[collapsible=icon]:hidden">Disconnect</span>
                    </Button>
                </div>
              ) : (
                <Button onClick={connectWallet} disabled={isConnecting} className="w-full flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </span>
                </Button>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
             {userRole && <SidebarMenu>
              {visibleMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
