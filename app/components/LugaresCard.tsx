"use client";

import { Heart, Star, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const LugaresCard = ({
  place,
  isFavorite,
  onToggleFavorite,
}: PlaceCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm w-full">
      <div className="relative aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
        <Image
          src={
            place.image ||
            "/placeholder.svg?height=240&width=320&query=modern restaurant interior"
          }
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFavorite}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
        >
          <Heart
            className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground hover:text-red-500"
            }`}
          />
        </Button>

        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 font-medium text-xs sm:text-sm px-2 py-1">
            {place.category}
          </Badge>
        </div>

        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{place.rating}</span>
        </div>
      </div>

      <CardContent className="p-3 sm:p-5 space-y-3 sm:space-y-4">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-foreground leading-tight mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {place.name}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2">
            {place.description}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span className="truncate font-medium">{place.address}</span>
          </div>

          {place.distance && (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm min-w-0 flex-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground">
                  {place.distance}
                </span>
                <span className="text-muted-foreground hidden sm:inline">
                  de distancia
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-primary/5 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto flex-shrink-0"
              >
                <Phone className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Llamar</span>
                <span className="sm:hidden">📞</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
