import React from "react";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import "./navBar.css";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";
import img from "../../assets/logo1.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
function navBar({ config }) {
  const menComponents: { title: string; href: string; description: string }[] =
    [
      {
        title: "Clothing",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Footwear",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Watches",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        title: "Fragrance for Men",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
      },
    ];

  const womenComponents: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: "Clothing",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Footwear",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Watches",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Fragrance for Men",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
  ];
  return (
    <div
      className="bg-black h-20  "
      style={{
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div
        // className="h-20 sticky top-0 right-0 left-0 "
        style={{
          backdropFilter: "blur(4px)",
          backgroundColor: "#2626264a",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        {" "}
        <img src={img} style={{ height: "50px" }} />
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          width: "50%",
          backgroundColor: "white",
          // justifyContent: "space-between",
          borderRadius: "5px",
          paddingLeft: "5px",
          paddingRight: "5px",
          alignItems: "center",
          height: "70%",
        }}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Mens</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="MensFeshionStyle flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        {/* <img src={MensFeshion}/> */}
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Mens
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {menComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Womens</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 col-3 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {womenComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="WomensFeshionStyle flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Womens
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div style={{ height: "60%", border: "0.5px solid grey" }}></div>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          style={{ width: "80%", marginRight: "5px", border: "none" }}
          onFocus={(e) => (e.target.style.outline = "none")}
        />
      </div>

      <div style={{display:"flex",flexDirection:"row",gap:20}}>
        <button>
          <ShoppingCartIcon style={{ color: "white" }} />
        </button>

        <Avatar src="/broken-image.jpg" />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default navBar;
