import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Package, 
  Users, 
  DollarSign,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/courts', icon: Building2, label: 'Courts' },
  { href: '/admin/equipment', icon: Package, label: 'Equipment' },
  { href: '/admin/coaches', icon: Users, label: 'Coaches' },
  { href: '/admin/pricing', icon: DollarSign, label: 'Pricing Rules' },
];

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {!collapsed && (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
                  <span className="text-sm">🏸</span>
                </div>
                <span className="font-display font-bold">Admin</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = link.exact 
                ? location.pathname === link.href
                : location.pathname.startsWith(link.href);
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  )}
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              );
            })}
          </nav>
          
          {/* Back to Site */}
          <div className="p-3 border-t border-sidebar-border">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent text-sidebar-foreground",
                collapsed && "justify-center"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              {!collapsed && <span>Back to Site</span>}
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
