import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/Ui/ui/button";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const router = useRouter();

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Live Tv", href: "/livetv" },
    { name: "Live Shows", href: "/liveshows" },
    { name: "My List", href: "/mylist" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black-background/95 backdrop-blur-md border-b border-grey.400/20">
      <div className="w-full px-[20px] sm:px-[40px] lg:px-[120px]">
        <div className="flex items-center h-24">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="text-white.200 font-bold text-5xl font-1 cursor-pointer">
              Liveparte
            </div>
          </div>

          {/* Navigation Menu - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-base font-500 transition-colors duration-200 no-underline",
                      isActive
                        ? "text-white.200"
                        : "text-grey.200 hover:text-white.200"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section - Search and Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-white.200 hover:text-white.200/80 transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>

            {/* Sign In Link */}
            <Link
              href="/signin"
              className="hidden sm:block text-sm font-500 text-grey.200 hover:text-white.200 transition-colors duration-200 no-underline"
            >
              Sign In
            </Link>

            {/* Sign Up Button */}
            <Button
              asChild
              className="bg-white.200 text-black.100 hover:bg-white.200/90 shadow-lg hover:shadow-xl font-500 no-underline"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white.200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
