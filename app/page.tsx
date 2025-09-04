"use client";

import { useState, useEffect } from "react";

import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MisFavoritos } from "./components/MisFavoritos";
import { Buscador } from "./components/Buscador";
import { BotonLocation } from "./components/BotonLocation";
import { LugaresCard } from "./components/LugaresCard";

interface Place {
  id: string;
  name: string;
  description: string;
  rating: number;
  address: string;
  category: string;
  distance?: string;
  image?: string;
}

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Solicitar geolocalización al cargar la página
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
        }
      );
    }
  }, []);

  // Función para buscar lugares (simulada - aquí conectarías con Google Places API)
  const searchPlaces = async (query: string) => {
    if (!userLocation || !query.trim()) return;

    setIsLoading(true);

    // Simulación de búsqueda - reemplazar con Google Places API
    setTimeout(() => {
      const mockResults: Place[] = [
        {
          id: "1",
          name: "Restaurante El Buen Sabor",
          description:
            "Comida tradicional con los mejores ingredientes locales",
          rating: 4.5,
          address: "Calle Principal 123",
          category: "Restaurante",
          distance: "0.2 km",
          image: "/cozy-italian-restaurant.png",
        },
        {
          id: "2",
          name: "Peluquería Estilo Moderno",
          description: "Cortes modernos y tratamientos capilares profesionales",
          rating: 4.8,
          address: "Avenida Central 456",
          category: "Peluquería",
          distance: "0.5 km",
          image: "/hair-salon-interior.png",
        },
        {
          id: "3",
          name: "Café Aromático",
          description: "El mejor café de la ciudad con ambiente acogedor",
          rating: 4.3,
          address: "Plaza Mayor 789",
          category: "Café",
          distance: "0.8 km",
          image: "/cozy-corner-cafe.png",
        },
      ].filter(
        (place) =>
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const toggleFavorite = (place: Place) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === place.id);
      if (isFavorite) {
        return prev.filter((fav) => fav.id !== place.id);
      } else {
        return [...prev, place];
      }
    });
  };

  const isFavorite = (placeId: string) => {
    return favorites.some((fav) => fav.id === placeId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                Lugares Cercanos
              </h1>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <MisFavoritos
                  favorites={favorites}
                  onRemoveFavorite={(place) => toggleFavorite(place)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Location Status */}
        <BotonLocation
          userLocation={userLocation}
          onLocationUpdate={setUserLocation}
        />

        {/* Search Bar */}
        <Buscador
          onSearch={searchPlaces}
          isLoading={isLoading}
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Resultados de búsqueda
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((place) => (
                <LugaresCard
                  key={place.id}
                  place={place}
                  isFavorite={isFavorite(place.id)}
                  onToggleFavorite={() => toggleFavorite(place)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && searchQuery && !isLoading && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No se encontraron lugares
            </h3>
            <p className="text-muted-foreground">
              Intenta buscar restaurantes, peluquerías, cafés, etc.
            </p>
          </div>
        )}

        {/* Welcome State */}
        {searchResults.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Descubre lugares increíbles cerca de ti
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Busca restaurantes, peluquerías, cafés y muchos otros lugares.
              Guarda tus favoritos para encontrarlos fácilmente.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Restaurantes", "Peluquerías", "Cafés", "Tiendas"].map(
                (category) => (
                  <Button
                    key={category}
                    variant="outline"
                    onClick={() => {
                      setSearchQuery(category);
                      searchPlaces(category);
                    }}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
