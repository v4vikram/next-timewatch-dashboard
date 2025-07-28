import {
  Box,
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  List,
  Logs,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    label: "Products",
    currentLink: "product",
    icon: <Box className="text-inherit" />,
    items: [
      {
        label: "Create Product",
        childCurrentLink: "create",
        href: "/dashboard/product/create",
        icon: <Plus className="w-4" />,
      },
      {
        label: "Product List",
        childCurrentLink: "product",
        href: "/dashboard/product",
        icon: <List className="w-4" />,
      },
    ],
  },
  {
    label: "Customer",
    currentLink: "customer",
    icon: <User className="text-inherit" />,
    items: [
      // {
      //   label: "Create Product",
      //   href: "/dashboard/product/create",
      //   icon: <Plus className="w-4" />,
      // },
      {
        label: "Customer List",
        childCurrentLink: "customer",
        href: "/dashboard/customer",
        icon: <List className="w-4" />,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const parentPath = pathname.split("/")[2];
  const childtPath = pathname.split("/")[3] ? pathname.split("/")[3] : pathname.split("/")[2];

  // sidebarItems?.map((link)=>link?.items((subLink)=>subLink?.label === ))

  console.log("pathname", parentPath, childtPath);
  return (
    <Sidebar>
      <SidebarContent>
        {sidebarItems.map((group, idx) => (
          <Collapsible key={idx} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger
                  className={`flex gap-x-1 cursor-pointer ${
                    group?.currentLink == parentPath
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }  p-2 rounded`}
                >
                  <span className="text-inherit">{group.icon}</span>
                  <span className="text-inherit">{group.label}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 text-inherit" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              {/* Collapsible content with transition */}
              <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden">
                {group.items.map((item, itemIdx) => (
                  <SidebarGroupContent key={itemIdx}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-x-1 cursor-pointer hover:bg-muted px-2 py-1 bg-red-200. rounded-md my-1 ml-3`}
                    >
                      {item.icon}
                      <span
                        className={`${
                          item?.childCurrentLink === childtPath
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </SidebarGroupContent>
                ))}
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
