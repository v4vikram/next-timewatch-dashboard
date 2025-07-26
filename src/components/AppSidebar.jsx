import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  List,
  Logs,
  Plus,
  Search,
  Settings,
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

const sidebarItems = [
  {
    label: "Products",
    icon: <Logs className="text-primary-foreground"/>,
    items: [
      {
        label: "Create Product",
        href: "/dashboard/product/create",
        icon: <Plus className="w-4" />,
      },
      {
        label: "Product List",
        href: "/dashboard/product",
        icon: <List className="w-4" />,
      },
    ],
  },
  // Add more groups here if needed
];

export function AppSidebar() {
  return (
  <Sidebar>
  <SidebarContent>
    {sidebarItems.map((group, idx) => (
      <Collapsible key={idx} defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="flex gap-x-1 cursor-pointer bg-primary p-2 rounded">
              {group.icon}
              <span className="text-primary-foreground">{group.label}</span>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 text-primary-foreground" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>

          {/* Collapsible content with transition */}
          <CollapsibleContent
            className="transition-all duration-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden"
          >
            {group.items.map((item, itemIdx) => (
              <SidebarGroupContent key={itemIdx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-x-1 cursor-pointer hover:bg-muted px-2 py-1 bg-red-200. rounded-md my-1 ml-2"

                >
                  {item.icon}
                  <span>{item.label}</span>
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
