import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";



export default async function Header(){
    const client = createClient();
    const settings = await client.getSingle("settings");
    return (
//changed to 8xl from 7 and mx from auto to 8
        <header className="top-0 z-50 mx-8 max-w-8xl md:sticky md:top-4"> 
            <nav>
                <ul>
                    <li>
                        <Link href="/" aria-label="Home Page">
                            {settings.data.name}
                        </Link>
                    </li>
                    {settings.data.nav_item.map(({link, label}, index)=>(
                        <li key={index}>
                           <PrismicNextLink field ={link}>
                            {label}
                           </PrismicNextLink>
                        </li>
                    )
                    
                    )}
                    <li>

                    </li>
                </ul>
            </nav>
        </header>
    );
}