import Header from '@/components/core1/header';
import FadeIn from '@/components/core1/fade-in';
import Footer from '@/components/core1/footer';
import wallpaperHeader from '@/assets/wallpaper-header-2.jpg';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useEffect, useState } from 'react';
import { getTours, getItineraryByTour } from "@/api/coreI";
export default function BookingPage() {
    const [tours, setTours] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loadError, setLoadError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 9;
    const [totalPages, setTotalPages] = useState(1);
    const [hasServerPagination, setHasServerPagination] = useState(false);

	const getCurrencySymbol = (code = "") => {
		const map = { PHP: "₱", USD: "$", EUR: "€", GBP: "£" };
		return map[code.toUpperCase()] || "";
	};

	useEffect(() => {
		let isActive = true;
		(async () => {
			try {
				setIsLoading(true);
				setLoadError("");
				const apiResponse = await getTours({ page: currentPage, per_page: perPage, limit: perPage });
				const data = Array.isArray(apiResponse)
					? apiResponse
					: (
						// Support Laravel paginator or custom wrappers
						apiResponse?.data?.data ||
						apiResponse?.data ||
						apiResponse?.tours ||
						[]
					);

				// Detect server pagination
				const meta = Array.isArray(apiResponse)
					? null
					: (apiResponse?.meta || apiResponse);
				const lastPage = meta?.last_page || meta?.lastPage || meta?.pagination?.last_page;
				const per = meta?.per_page || meta?.perPage || perPage;
				const hasPagination = Boolean(lastPage);
				const normalizeTour = (t) => {
					const currencyCode = t.currency || "";
					const symbol = getCurrencySymbol(currencyCode);
					const currentPrice = t.sale_price ?? t.price;
					const original = t.sale_price ? t.price : null;
					const formatMoney = (n) =>
						n == null ? "" : `${symbol}${Number(n).toLocaleString()}`;

					const duration =
						t.duration_days || t.duration_nights
							? `${t.duration_days || 0} Days / ${t.duration_nights || 0} Nights`
							: "";

					const location = [t.city, t.state, t.country]
						.filter(Boolean)
						.join(", ");

					return {
						id: t.id ?? t.slug ?? String(t.title || Math.random()),
						title: t.title ?? "Untitled Tour",
						description: t.summary ?? t.description ?? "",
						fullDescription: t.description ?? undefined,
						location,
						duration,
						difficulty: "",
						groupSize: t.capacity ? `${t.capacity} people` : "",
						price: formatMoney(currentPrice),
						originalPrice: original ? formatMoney(original) : "",
						rating: t.rating ?? undefined,
						reviewCount: t.reviews_count ?? undefined,
					image: t.thumbnail_url ?? (Array.isArray(t.gallery) ? t.gallery[0] : ""),
					images: Array.isArray(t.gallery) ? t.gallery : undefined,
						highlights: t.highlights ?? undefined,
						itinerary: t.itinerary ?? undefined,
						inclusions: t.inclusions ?? undefined,
						exclusions: t.exclusions ?? undefined,
						// extra backend fields preserved for future use
						_slug: t.slug,
						_currency: currencyCode,
						_isRefundable: t.is_refundable,
						_dates: { start: t.start_date, end: t.end_date, booking_deadline: t.booking_deadline },
						_availability: { capacity: t.capacity, available_slots: t.available_slots },
						_age: { min: t.min_age, max: t.max_age },
						_geo: { lat: t.latitude, lng: t.longitude },
						_logistics: { starting_point: t.starting_point, transport_mode: t.transport_mode, accommodation_type: t.accommodation_type, meal_plan: t.meal_plan },
						_meta: { meta_title: t.meta_title, meta_description: t.meta_description },
						_status: { status: t.status, is_featured: t.is_featured, is_active: t.is_active, published_at: t.published_at },
					};
				};
				if (isActive && Array.isArray(data)) {
					setTours(data.map(normalizeTour));
					setHasServerPagination(hasPagination);
					setTotalPages(
						hasPagination
							? Number(lastPage)
							: Math.max(1, Math.ceil(data.length / (per || perPage)))
					);
				}
			} catch (err) {
				console.error("Failed to load tours", err);
				if (isActive) setLoadError("Failed to load tours.");
			} finally {
				if (isActive) setIsLoading(false);
			}
		})();
		return () => { isActive = false };
	}, [currentPage]);
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("All");
    const [selectedTour, setSelectedTour] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [itineraryLoading, setItineraryLoading] = useState(false);
    const [itineraryError, setItineraryError] = useState("");

    const filteredTours = tours.filter((tour) => {
        const matchesQuery = `${tour?.title || ''} ${tour?.description || ''}`.toLowerCase().includes(query.toLowerCase());
        const matchesLocation = location === "All"
            ? true
            : (tour?.title || '').toLowerCase().includes(location.toLowerCase());
        return matchesQuery && matchesLocation;
    });

    const pagedTours = hasServerPagination
        ? filteredTours
        : filteredTours.slice((currentPage - 1) * perPage, currentPage * perPage);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    const handleViewDetails = (tour) => {
        setSelectedTour(tour);
        setSelectedImage(0);
        setActiveTab('overview');
    };

    const handleBackToList = () => {
        setSelectedTour(null);
    };
    // Load itinerary when a tour is selected
    useEffect(() => {
        let isActive = true;
        (async () => {
            if (!selectedTour?.id) return;
            try {
                setItineraryLoading(true);
                setItineraryError("");
                const items = await getItineraryByTour(selectedTour.id);
                if (!isActive) return;
                if (items && items.length) {
                    const normalized = items.map((i, idx) => ({
                        day: i.day_number ?? idx + 1,
                        title: i.title || `Day ${i.day_number ?? idx + 1}`,
                        activities: i.description ? [i.description] : [],
                        meals: [],
                        accommodation: "",
                        time: { start: i.start_time, end: i.end_time },
                        location: i.location,
                        lat: i.latitude,
                        lng: i.longitude,
                    }));
                    setSelectedTour((prev) => ({ ...prev, itinerary: normalized }));
                }
            } catch (e) {
                if (isActive) setItineraryError("Failed to load itinerary.");
            } finally {
                if (isActive) setItineraryLoading(false);
            }
        })();
        return () => { isActive = false };
    }, [selectedTour?.id]);

    // If a tour is selected, show tour details
    if (selectedTour) {
        return (
            <div className="flex justify-center">
                <div className="max-w-[1920px] w-full">
                    <Header />

                    {/* Back Button */}
                    <div className="p-4">
                        <Button 
                            variant="outline" 
                            onClick={handleBackToList}
                            className="mb-4"
                        >
                            ← Back to Tours
                        </Button>
                    </div>

                    {/* Hero Section */}
                    <div className="relative h-[400px] overflow-hidden">
                        <img 
                            src={selectedTour.images ? selectedTour.images[selectedImage] : selectedTour.image} 
                            alt={selectedTour.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                            <FadeIn>
                                <h1 className="text-4xl font-bold mb-2">{selectedTour.title}</h1>
                                <p className="text-xl">{selectedTour.location}</p>
                                <div className="flex items-center mt-2">
                                    <div className="flex items-center mr-4">
                                        {renderStars(selectedTour.rating)}
                                        <span className="ml-2">{selectedTour.rating} ({selectedTour.reviewCount} reviews)</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-white text-black">
                                        {selectedTour.duration}
                                    </Badge>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    {selectedTour.images && (
                        <div className="p-8">
                            <FadeIn>
                                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                                <Carousel className="w-full max-w-4xl mx-auto">
                                    <CarouselContent>
                                        {selectedTour.images.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card className="overflow-hidden">
                                                        <img 
                                                            src={image} 
                                                            alt={`${selectedTour.title} - Image ${index + 1}`}
                                                            className="w-full h-64 object-cover cursor-pointer"
                                                            onClick={() => setSelectedImage(index)}
                                                        />
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
                    )}

                    <div className="px-8 pb-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    {/* Navigation Tabs */}
                                    <div className="flex border-b mb-6">
                                        {['overview', 'itinerary', 'reviews'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-6 py-3 font-medium capitalize ${
                                                    activeTab === tab 
                                                        ? 'border-b-2 border-blue-500 text-blue-600' 
                                                        : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    {activeTab === 'overview' && (
                                        <FadeIn>
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-bold mb-3">About This Tour</h3>
                                                    <p className="text-gray-700 leading-relaxed">{selectedTour.fullDescription || selectedTour.description}</p>
                                                </div>

                                                {selectedTour.highlights && (
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-3">Tour Highlights</h3>
                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            {selectedTour.highlights.map((highlight, index) => (
                                                                <li key={index} className="flex items-center">
                                                                    <span className="text-green-500 mr-2">✓</span>
                                                                    {highlight}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {selectedTour.inclusions && (
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-3">What's Included</h3>
                                                        <ul className="space-y-2">
                                                            {selectedTour.inclusions.map((inclusion, index) => (
                                                                <li key={index} className="flex items-center">
                                                                    <span className="text-green-500 mr-2">✓</span>
                                                                    {inclusion}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {selectedTour.exclusions && (
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-3">What's Not Included</h3>
                                                        <ul className="space-y-2">
                                                            {selectedTour.exclusions.map((exclusion, index) => (
                                                                <li key={index} className="flex items-center">
                                                                    <span className="text-red-500 mr-2">✗</span>
                                                                    {exclusion}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {selectedTour.importantNotes && (
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-3">Important Notes</h3>
                                                        <ul className="space-y-2">
                                                            {selectedTour.importantNotes.map((note, index) => (
                                                                <li key={index} className="flex items-start">
                                                                    <span className="text-blue-500 mr-2 mt-1">ℹ</span>
                                                                    {note}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </FadeIn>
                                    )}

                                    {activeTab === 'itinerary' && (
                                        <FadeIn>
                                            <div className="space-y-6">
                                                {itineraryLoading && (
                                                    <p className="text-sm text-muted-foreground">Loading itinerary...</p>
                                                )}
                                                {itineraryError && (
                                                    <p className="text-sm text-red-500">{itineraryError}</p>
                                                )}
                                                {selectedTour.itinerary?.map((day, index) => (
                                                    <Card key={index} className="p-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                                                {day.day}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-bold mb-2">{day.title}</h3>
                                                                {day.time?.start && (
                                                                    <p className="text-sm text-gray-600 mb-2">{day.time.start} - {day.time?.end || ''}</p>
                                                                )}
                                                                {day.location && (
                                                                    <p className="text-sm text-gray-600 mb-2">{day.location}</p>
                                                                )}
                                                                <div className="mb-3">
                                                                    <h4 className="font-semibold mb-1">Activities:</h4>
                                                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                                                        {day.activities.map((activity, actIndex) => (
                                                                            <li key={actIndex}>{activity}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                {day.meals?.length > 0 && (
                                                                    <div className="mb-3">
                                                                        <h4 className="font-semibold mb-1">Meals:</h4>
                                                                        <p className="text-sm">{day.meals.join(", ")}</p>
                                                                    </div>
                                                                )}
                                                                {day.accommodation && (
                                                                    <div>
                                                                        <h4 className="font-semibold mb-1">Accommodation:</h4>
                                                                        <p className="text-sm">{day.accommodation}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </FadeIn>
                                    )}

                                    {activeTab === 'reviews' && selectedTour.reviews && (
                                        <FadeIn>
                                            <div className="space-y-6">
                                                <div className="text-center">
                                                    <div className="text-4xl font-bold text-blue-600">{selectedTour.rating}</div>
                                                    <div className="flex justify-center mb-2">
                                                        {renderStars(selectedTour.rating)}
                                                    </div>
                                                    <p className="text-gray-600">Based on {selectedTour.reviewCount} reviews</p>
                                                </div>

                                                <Separator />

                                                <div className="space-y-4">
                                                    {selectedTour.reviews.map((review, index) => (
                                                        <Card key={index} className="p-4">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="font-semibold">{review.name}</h4>
                                                                    <div className="flex items-center">
                                                                        {renderStars(review.rating)}
                                                                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-700">{review.comment}</p>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        </FadeIn>
                                    )}
                                </div>

                                {/* Booking Sidebar */}
                                <div className="lg:col-span-1">
                                    <FadeIn>
                                        <Card className="p-6 sticky top-8">
                                            <div className="text-center mb-6">
                                                <div className="text-3xl font-bold text-blue-600">{selectedTour.price}</div>
                                                {selectedTour.originalPrice && (
                                                    <>
                                                        <div className="text-lg text-gray-500 line-through">{selectedTour.originalPrice}</div>
                                                        <div className="text-sm text-green-600 font-semibold">Save ₱3,000!</div>
                                                    </>
                                                )}
                                            </div>

                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between">
                                                    <span>Duration:</span>
                                                    <span className="font-semibold">{selectedTour.duration}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Difficulty:</span>
                                                    <span className="font-semibold">{selectedTour.difficulty}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Group Size:</span>
                                                    <span className="font-semibold">{selectedTour.groupSize}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                    Book Now
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Add to Wishlist
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Share Tour
                                                </Button>
                                            </div>

                                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                                <h4 className="font-semibold mb-2">Need Help?</h4>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    Our travel experts are here to help you plan your perfect trip.
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Contact Us
                                                </Button>
                                            </div>
                                        </Card>
                                    </FadeIn>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }

    // Default tour listing view
    return(
        <>
            <div className="relative overflow-hidden">
                    <img src={wallpaperHeader} alt="wallpaper" className="absolute inset-0 w-[100%] h-[100%] object-cover -z-1 blur-[2px]"/>
                    <Header />

                    {/* Hero */}

                    <div className="p-60 px-10 flex justify-center">
                        <FadeIn>
                            <h1 className="text-white text-[40px] text-center font-bold">Your Gateway to Endless</h1>
                            <p className="text-(--vivid-neon-pink) lg:text-[60px] text-center font-bold leading-tight text-[40px]">Adventures.</p>
                        </FadeIn>
                    </div>
                </div>

            <FadeIn className="p-8 rounded-lg bg-white w-full flex flex-col" id="destinations">
                <div className="flex justify-center">
                    <div className="w-full max-w-[1200px]">
                        <h1 className="text-2xl font-bold mb-4">Choose your tour</h1>
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search tours (e.g., Boracay, river, sunset)"
                                className="border rounded-md p-3 w-full sm:w-[60%]"
                            />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="border rounded-md p-3 w-full sm:w-[40%]"
                            >
                                <option value="All">All locations</option>
                                <option value="Palawan">Palawan</option>
                                <option value="Boracay">Boracay</option>
                                <option value="Bohol">Bohol</option>
                            </select>
                        </div>
						{isLoading && (
							<p className="text-sm text-muted-foreground mb-4">Loading tours...</p>
						)}
						{loadError && (
							<p className="text-sm text-red-500 mb-2">{loadError}</p>
						)}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pagedTours.map((tour, index) => (
                                <Card key={index} className="relative overflow-hidden p-0 h-full flex flex-col">
                                    <div className="h-48 w-full relative">
                                        <img src={tour.image} alt={tour.title} className="absolute inset-0 w-[100%] h-[100%] object-cover"/>
                                    </div>
                                    <CardContent className="p-4 flex flex-col flex-1">
                                        <p className="font-bold">{tour.title}</p>
                                        <p className="text-sm text-muted-foreground mb-3">{tour.description}</p>
                                        {tour.rating && (
                                            <div className="flex items-center mb-3">
                                                {renderStars(tour.rating)}
                                                <span className="ml-2 text-sm text-gray-600">({tour.reviewCount} reviews)</span>
                                            </div>
                                        )}
                                        {tour.price && (
                                            <div className="text-lg font-bold text-blue-600 mb-3">{tour.price}</div>
                                        )}
                                        <div className="flex items-center gap-2 mt-auto">
                                            <Button
                                                variant="outline"
                                                className="cursor-pointer"
                                                onClick={() => handleViewDetails(tour)}
                                            >
                                                View details
                                            </Button>
                                            <Button
                                                className="bg-(--primary) text-white cursor-pointer hover:bg-(--primary)"
                                                onClick={() => alert(`Booking ${tour.title}`)}
                                            >
                                                Book now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1 rounded border ${
                                            currentPage === pageNum
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>
                        )}
                        {filteredTours.length === 0 && (
                            <p className="text-sm text-muted-foreground mt-2">No tours match your search.</p>
                        )}
                    </div>
                </div>
            </FadeIn>

            <Footer />
        </>
    )
}