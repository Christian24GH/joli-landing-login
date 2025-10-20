import Header from '@/components/core1/header';
import FadeIn from '@/components/core1/fade-in';
import Footer from '@/components/core1/footer';

import { Button } from "@/components/ui/button";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import logo from '@/assets/finallogo.avif'
import wallpaperHeader from "@/assets/wallpaper-header.jpg"
import featuredImg1 from "@/assets/Bohol.jpg";
import featuredImg2 from "@/assets/Boracay.jpg";
import featuredImg3 from "@/assets/Palawan.jpg";

import React from 'react';
import { Link } from 'react-router';

export default function LandingPage() {

    const featuredDestinations = [
        {
            image: featuredImg3,
            title: "El Nido, Palawan",
            subtitle: "Lagoon Hooping Limestone Cliff",
        },
        {
            image: featuredImg2,
            title: "Boracay",
            subtitle: "White Beach Water Sport",
        },
        {
            image: featuredImg1,
            title: "Bohol",
            subtitle: "Chocolate Hills Tarsier",
        },
    ];

    return(
        <div className="flex justify-center">
            <div className="max-w-[1920px] w-full">

                <div className="relative overflow-hidden">
                    <img src={wallpaperHeader} alt="wallpaper" className="absolute inset-0 w-[100%] h-[100%] object-cover -z-1 blur-[2px]"/>
                    <Header />

                    {/* Hero */}

                    <div className="p-60 px-10 flex justify-center">
                        <FadeIn className="p-8 rounded-lg bg-white lg:w-[700px] flex flex-col">
                            <h1 className="text-[30px] text-center font-bold">Design your next Escape with</h1>
                            <p className="text-(--primary) lg:text-[50px] text-center font-bold leading-tight text-[40px]">JOLI Travel And Tours</p>
                            <p className="my-4 text-center">Curated itineraries, reliable transfer, and local-guided experiences across the philippines and beyond.</p>

                            <Link to="/booking" className="self-center"><Button className="cursor-pointer">Find Packages</Button></Link>
                        </FadeIn>
                    </div>
                </div>

                {/* ========== Popular Destinations ========== */}

                <div className="p-20 lg:flex lg:flex-col lg:items-center" id="destinations">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-[20px] font-bold">Destinations</h1>
                        <Link to="/booking"><p className="text-(--primary) text-[20px] font-bold">See all Packages</p></Link>
                        
                    </div>

                    {/* xl-1280 view */}

                    <div className="xl:block hidden w-full">
                        <FadeIn className="flex items-center mt-4 justify-evenly">
                            <Card className="relative overflow-hidden p-0 w-80 h-60">
                                <img src={featuredImg3} alt="featuredimage" className="absolute bottom-0 w-[100%] h-[100%]"/>
                                <CardContent className="absolute bottom-5">
                                    <p className="text-white font-bold">El Nido, Palawan</p>
                                    <p className="text-white">Lagoon Hooping Limestone Cliff</p>  
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden p-0 w-80 h-60">
                                <img src={featuredImg2} alt="featuredimage" className="absolute bottom-0 w-[100%] h-[100%]"/>
                                <CardContent className="absolute bottom-5">
                                    <p className="text-white font-bold">Boracay</p>
                                    <p className="text-white">White Beach Water Sport</p>  
                                </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden p-0 w-80 h-60">
                                <img src={featuredImg1} alt="featuredimage" className="absolute bottom-0 w-[100%] h-[100%]"/>
                                <CardContent className="absolute bottom-5">
                                    <p className="text-white font-bold">Bohol</p>
                                    <p className="text-white">Chocolate Hills Tarsier</p>  
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* md & lg (768px - 1279px) view: carousel */}

                    <div className="hidden md:block xl:hidden mt-4">
                        <FadeIn className="flex justify-center">
                            <Carousel className="w-[28rem]">
                                <CarouselContent>
                                    {featuredDestinations.map((dest, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card className="relative overflow-hidden p-0 w-[28rem] h-60">
                                                    <img src={dest.image} alt="featuredimage" className="absolute bottom-0 w-[100%] h-[100%]"/>
                                                    <CardContent className="absolute bottom-5">
                                                        <p className="text-white font-bold">{dest.title}</p>
                                                        <p className="text-white">{dest.subtitle}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </FadeIn>
                    </div>

                    {/* sm (<768px) view: carousel */}

                    <div className="block md:hidden mt-4">
                        <FadeIn className="flex justify-center">
                            <Carousel className="w-80">
                                <CarouselContent>
                                    {featuredDestinations.map((dest, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card className="relative overflow-hidden p-0 w-80 h-60">
                                                    <img src={dest.image} alt="featuredimage" className="absolute bottom-0 w-[100%] h-[100%]"/>
                                                    <CardContent className="absolute bottom-5">
                                                        <p className="text-white font-bold">{dest.title}</p>
                                                        <p className="text-white">{dest.subtitle}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </FadeIn>
                    </div>
                </div>

                {/* ========== Reviews ========== */}

                <div className="p-8 bg-[#e9efff] lg:flex lg:flex-col lg:items-center">
                    <h1 className="text-center text-[30px] mb-8 font-bold">Traveler Reviews</h1>

                    <div className="grid 
                                    gap-4 
                                    grid-cols-2
                    
                                    2xl:flex 
                                    2xl:items-center 
                                    2xl:justify-evenly 
                                    2xl:w-full

                                    lg:w-[800px]">

                        <div className="p-4 rounded-md bg-(--primary) 2xl:w-80 xl:w-full">
                            <p className="text-white">Flawless Palawan trip! Transfer were on time and tours felt truly local</p>
                            <p className="mt-2 text-white">- Mika p.</p>
                        </div>

                        <div className="p-4 rounded-md bg-(--primary) 2xl:w-80 xl:w-full">
                            <p className="text-white">They customize our Cebu itinerary around our kids-super helpful support</p>
                            <p className="mt-2 text-white">- Arvin p.</p>
                        </div>

                        <div className="p-4 rounded-md bg-(--primary) 2xl:w-80 xl:w-full">
                            <p className="text-white">Great value for money. We loved the Coron shipwreck tour!</p>
                            <p className="mt-2 text-white">- Jessa L.</p>
                        </div>

                        <div className="p-4 rounded-md bg-(--primary) 2xl:w-80 xl:w-full">
                            <p className="text-white">Quick to respond and very organized. Will book again.</p>
                            <p className="mt-2 text-white">- Leo S.</p>
                        </div>
                    </div>
                </div>

                {/* ========== Questions ========== */}

                <div className="flex items-center py-8 flex-col">
                    <h1 className="text-center font-bold text-2xl mb-8">Frequently asked questions</h1>

                    <div className="flex items-center flex-col rounded-xl border w-[90%] 2xl:w-[40%] ">

                        <div className="p-8 border-b w-[100%]">
                            <p className="font-bold mb-8">What's included in a typical package?</p>
                            <p>Most include accomodations, daily breakfast, tours with local guides, entrance fees, and transfer. Flights can bundled request</p>
                        </div>

                        <div className="p-8 border-b w-[100%]">
                            <p className="font-bold mb-8">Can I customize my itinerary?</p>
                            <p>Absolutely. Tell us your dates, budget, and must-see spots and we'll tailor the trip</p>
                        </div>

                        <div className="p-8 border-b w-[100%]">
                            <p className="font-bold mb-8">What is your cancellation policy?</p>
                            <p>Free reschedules up to 7 days befores arrival for most packages. Full policy varies partner and season</p>
                        </div>
                    </div>
                </div>

                {/* ========== Quote Request ========== */}

                <div className="py-8 px-20 bg-[#dd06c427]">
                    <h1 className="text-center text-[30px] font-bold">Ready to start Planning?</h1>
                    <p className="text-center">Get a personalized quote in minutes. No commitment.</p>

                    <div className="flex items-center justify-center mt-8">
                        <Button className="bg-[#dd06c5] hover:bg-[#dd06c5] cursor-pointer text-white">
                            Request a quote
                        </Button>
                    </div>
                </div>

                {/* ========== Contact ========== */}

                <div className="flex flex-col items-center p-8 gap-8 xl:items-start xl:flex-row xl:justify-center">
                    <div>
                        <h1 className="font-bold text-2xl text-center xl:text-left">Contact Us</h1>
                        <p className="text-center xl:text-left">Tell us your dream trip and we'll handle the rest.</p>
                    </div>

                    <div className="px-8 py-2 shadow-xl rounded-md">
                        <input type="text" className="border rounded-xl p-4 w-90 my-2" placeholder="Full Name"/><br />
                        <input type="text" className="border rounded-xl p-4 w-90 my-2" placeholder="Email"/><br />
                        <input type="text" className="border rounded-xl p-4 w-90 my-2" placeholder="Destination (e.g., Cebu, Bohol)"/><br />
                        <textarea className="border rounded-xl p-4 w-90 h-90 resize-none my-2" placeholder="Tell us about your trip"/><br />

                        <input type="submit" className="border rounded-xl p-4 w-90 my-2 text-white bg-[#dd06c5]" placeholder="Send Inquiry"/>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}