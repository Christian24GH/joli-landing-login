import FadeIn from '@/components/core1/fade-in';

import { Button } from "@/components/ui/button"
import logo from '@/assets/finallogo.avif'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from 'react';
import { Link } from 'react-router';

export default function Header() {
    const mainNavItems = [
        { label: 'Destination', href: '/booking'},
        { label: 'Why Us', href: '#'},
        { label: 'Packages', href: '#'},
        { label: 'Reviews', href: '#'},
        { label: 'FAQ', href: '#'},
    ];

    return(
        <FadeIn className="flex items-center m-4 justify-between lg:relative">
            <div className="flex items-center bg-white pr-8 rounded-lg">
                <Link to="/"><img src={logo} className="w-30" alt="Logo"/></Link>
                <h1 className="text-(--primary) text-[20px] font-bold">Travel & Tours</h1>
            </div>

            <div className="xl:block hidden bg-white px-8 py-4 rounded-lg">
                <div className="flex gap-15 items-center">
                    {mainNavItems.map((item) => (
                        <Link key={item.label} to={item.href}>{item.label}</Link>
                    ))}

                    <div className="flex gap-2">
                        <Button variant="outline" className="cursor-pointer">Contact</Button>
                        <Link to="/supplier" className="text-(--primary) hover:underline">Become Our Supplier</Link>
                        <Link to="/Login"><Button className="cursor-pointer lg:w-full">Login</Button></Link>
                    </div>
                </div>
            </div>
            
            <div className="xl:hidden bg-white px-8 py-3 rounded-lg">
                <div className="p-2 bg-(--primary) rounded-[5px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-white">Menu</DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-4 mt-5 w-[200px]">
                            {mainNavItems.map((item) => (
                                <DropdownMenuItem key={item.label}>
                                    <Link to={item.href}>{item.label}</Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" className="cursor-pointer">Contact</Button>
                                <Link to="/Login"><Button className="cursor-pointer w-full">Login</Button></Link>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </FadeIn>
    );
}